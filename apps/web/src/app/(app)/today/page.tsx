'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useTranslation } from 'react-i18next';
import { QuestionComposer } from '@/components/QuestionComposer';
import { AnswerComposer } from '@/components/AnswerComposer';
import { ParentMessageComposer } from '@/components/ParentMessageComposer';

// 부모 전용 — "먼저 마음 전하기" 큰 진입 버튼 + 작성 모달
function ParentMessageEntry({ connectionId, childName, onSent }: { connectionId: string; childName: string; onSent: () => void }) {
  const { t } = useTranslation('today');
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-5 rounded-2xl border-2 text-lg font-semibold transition-all hover:shadow-md"
        style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary-dark)', backgroundColor: '#EFF7F2' }}
        aria-label={t('parentEntry.aria')}
      >
        {t('parentEntry.title')}
        <span className="block text-sm font-normal text-gray-500 mt-1">
          {t('parentEntry.subtitle', { name: childName })}
        </span>
      </button>
      {open && (
        <ParentMessageComposer
          connectionId={connectionId}
          childName={childName}
          onClose={() => setOpen(false)}
          onSent={onSent}
        />
      )}
    </>
  );
}

export default function TodayPage() {
  const { t } = useTranslation('today');
  const me = trpc.auth.me.useQuery();
  const connections = trpc.connection.list.useQuery();
  const firstConn = connections.data?.[0];
  const utils = trpc.useUtils();

  const todayQ = trpc.question.today.useQuery(
    { connectionId: firstConn?.id ?? '' },
    { enabled: !!firstConn?.id },
  );

  const [showComposer, setShowComposer] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (connections.isLoading || me.isLoading) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="animate-spin text-3xl">🌀</div>
      </div>
    );
  }

  if (!firstConn) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-5xl">💌</div>
        <p className="text-gray-500">{t('noConnection')}</p>
      </div>
    );
  }

  const question = todayQ.data;
  const isParent = firstConn.fromUserId === me.data?.id;
  const parentName = firstConn.fromUser?.name ?? t('defaultParent');
  const childName = firstConn.toUser?.name ?? t('defaultChild');

  function refresh() {
    if (!firstConn) return;
    void utils.question.today.invalidate({ connectionId: firstConn.id });
    void utils.question.list.invalidate({ connectionId: firstConn.id });
  }

  // 오늘 질문 없음 — 자녀: 질문 작성기, 부모: 대기 안내
  if (!question) {
    if (isParent) {
      return (
        <div className="space-y-6">
          <div className="text-center py-10 space-y-4">
            <div className="text-5xl">🌤️</div>
            <p className="text-xl text-gray-700 font-medium">{t('parentWaiting.title')}</p>
            <p className="text-base text-gray-400">{t('parentWaiting.subtitle')}</p>
          </div>
          <ParentMessageEntry connectionId={firstConn.id} childName={childName} onSent={refresh} />
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900">{t('heading')}</h2>
        <div className="text-center py-12 space-y-4">
          <div className="text-5xl">🌤️</div>
          <div>
            <p className="text-gray-700 font-medium">{t('childNoQ.title')}</p>
            <p className="text-sm text-gray-400 mt-1">{t('childNoQ.subtitle', { name: parentName })}</p>
          </div>
          <button
            onClick={() => setShowComposer(true)}
            className="px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('childNoQ.cta')}
          </button>
        </div>
        {showComposer && (
          <QuestionComposer
            connectionId={firstConn.id}
            parentName={parentName}
            onClose={() => setShowComposer(false)}
            onSent={refresh}
          />
        )}
      </div>
    );
  }

  // 부모 화면 (답변 작성)
  if (isParent && !question.answer) {
    if (submitted) {
      return (
        <div className="space-y-6">
          <div className="text-center py-10 space-y-4">
            <div className="text-5xl">🙏</div>
            <p className="text-2xl font-bold text-gray-900">{t('thanks.title')}</p>
            <p className="text-lg text-gray-500">{t('thanks.subtitle')}</p>
          </div>
          <ParentMessageEntry connectionId={firstConn.id} childName={childName} onSent={refresh} />
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
              {t('badge.today')}
            </span>
            <span className="text-xs text-gray-400">{t('badge.depth', { n: question.depth })}</span>
          </div>
          <p className="text-2xl font-medium text-gray-900 leading-relaxed">{question.body}</p>
        </div>

        <AnswerComposer
          questionId={question.id}
          onDone={() => {
            setSubmitted(true);
            refresh();
          }}
          onSkip={() => {
            setSubmitted(true);
            refresh();
          }}
        />
      </div>
    );
  }

  // 이미 답변함 (또는 자녀가 답변 대기/확인)
  if (question.answer) {
    const a = question.answer as typeof question.answer & { masked?: boolean };
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">{t('heading')}</h2>
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-lg font-medium text-gray-700">{question.body}</p>
          <div className="border-t border-gray-100 pt-4">
            {a.skipped ? (
              <p className="text-gray-400 italic">{t('answered.skipped')}</p>
            ) : a.masked ? (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-xl">🔒</span>
                <p className="text-sm">{t('answered.private', { name: parentName })}</p>
              </div>
            ) : (
              <>
                {a.format === 'photo' && a.mediaUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.mediaUrl} alt={t('media.photo')} className="rounded-xl max-h-64 object-cover mb-2" />
                )}
                {a.format === 'video' && a.mediaUrl && (
                  <video src={a.mediaUrl} controls className="rounded-xl max-h-64 w-full mb-2" aria-label={t('media.video')} />
                )}
                {a.format === 'audio' && a.mediaUrl && (
                  <audio src={a.mediaUrl} controls className="w-full mb-2" aria-label={t('media.audio')} />
                )}
                {a.transcript && <p className="text-sm text-gray-500 italic mb-1">📝 {a.transcript}</p>}
                {a.body && <p className="text-base text-gray-900 whitespace-pre-wrap">{a.body}</p>}
                <p className="text-xs text-green-600 mt-2">
                  {t('answered.complete')}{a.isPrivate ? t('answered.privateTag') : ''}
                </p>
              </>
            )}
          </div>
        </div>
        {isParent && (
          <ParentMessageEntry connectionId={firstConn.id} childName={childName} onSent={refresh} />
        )}
      </div>
    );
  }

  // 자녀: 질문은 보냈지만 아직 답변 없음
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">{t('heading')}</h2>
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
        <p className="text-lg font-medium text-gray-700">{question.body}</p>
        <p className="text-sm text-gray-400">{t('waiting', { name: parentName })}</p>
      </div>
    </div>
  );
}
