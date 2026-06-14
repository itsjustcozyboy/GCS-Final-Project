'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { QuestionComposer } from '@/components/QuestionComposer';
import { AnswerComposer } from '@/components/AnswerComposer';
import { ParentMessageComposer } from '@/components/ParentMessageComposer';
import { CopyButton } from '@/components/CopyButton';
import { useToast } from '@/components/Toast';
import { useTranslation } from 'react-i18next';

// 답변/메시지의 미디어(사진·영상·음성) 표시
function AnswerMedia({ answer }: { answer: { format: string; mediaUrl: string | null; transcript: string | null } }) {
  const { t } = useTranslation('today');
  if (!answer.mediaUrl) {
    return answer.transcript ? <p className="text-sm text-gray-500 italic">🎤 {answer.transcript}</p> : null;
  }
  return (
    <div className="space-y-1">
      {answer.format === 'photo' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={answer.mediaUrl} alt={t('media.photo')} className="rounded-xl max-h-64 object-cover" />
      )}
      {answer.format === 'video' && (
        <video src={answer.mediaUrl} controls className="rounded-xl max-h-64 w-full" aria-label={t('media.video')} />
      )}
      {answer.format === 'audio' && (
        <audio src={answer.mediaUrl} controls className="w-full" aria-label={t('media.audio')} />
      )}
      {answer.transcript && <p className="text-sm text-gray-500 italic">📝 {answer.transcript}</p>}
    </div>
  );
}

function ReactionBar({ answerId, connectionId }: { answerId: string; connectionId: string }) {
  const { t } = useTranslation('feed');
  const { t: tc } = useTranslation('common');
  const toast = useToast();
  const [comment, setComment] = useState('');
  // 'comment' = 일반 댓글, 'followup' = 되묻기 (후속 질문으로 부모에게 전달)
  const [inputMode, setInputMode] = useState<'comment' | 'followup' | null>(null);
  const utils = trpc.useUtils();

  const addReaction = trpc.reaction.add.useMutation({
    onSuccess: () => {
      setComment('');
      setInputMode(null);
      utils.question.list.invalidate({ connectionId });
      toast.success(tc('feedback.reactionSent'));
    },
    onError: () => toast.error(tc('feedback.error')),
  });

  const EMOJIS = ['❤️', '😊', '😢', '👍', '🙏'];

  function send() {
    if (!comment.trim() || !inputMode) return;
    addReaction.mutate({ answerId, comment: comment.trim(), isFollowup: inputMode === 'followup' });
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-2 flex-wrap">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => addReaction.mutate({ answerId, emoji })}
            disabled={addReaction.isPending}
            className="px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label={t('reaction.reactAria', { emoji })}
          >
            {emoji}
          </button>
        ))}
        <button
          onClick={() => setInputMode(inputMode === 'comment' ? null : 'comment')}
          className="px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-gray-100 transition-colors"
        >
          {t('reaction.comment')}
        </button>
        <button
          onClick={() => setInputMode(inputMode === 'followup' ? null : 'followup')}
          className="px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-gray-100 transition-colors"
          title={t('reaction.followupTitle')}
        >
          {t('reaction.followup')}
        </button>
      </div>
      {inputMode && (
        <div className="space-y-1">
          {inputMode === 'followup' && (
            <p className="text-xs text-gray-400">{t('reaction.followupNote')}</p>
          )}
          <div className="flex gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none"
              placeholder={inputMode === 'followup' ? t('reaction.followupPlaceholder') : t('reaction.commentPlaceholder')}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button
              onClick={send}
              disabled={addReaction.isPending}
              className="px-4 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {t('actions.send', { ns: 'common' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StartConnectionModal({ role, onClose }: { role: 'child' | 'parent' | 'both'; onClose: () => void }) {
  const { t } = useTranslation('feed');
  const { t: tc } = useTranslation('common');
  const utils = trpc.useUtils();
  const [inviteCode, setInviteCode] = useState('');
  const [tone, setTone] = useState<'light' | 'deep'>('light');

  const createInvite = trpc.connection.createInvite.useMutation();
  const acceptInvite = trpc.connection.acceptInvite.useMutation({
    onSuccess: () => {
      void utils.connection.list.invalidate();
      onClose();
    },
  });

  const normalizedInviteCode = inviteCode.replace(/[\s-]/g, '').toUpperCase();
  const isParent = role === 'parent';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-5 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900">{t('modal.title')}</h2>
          <p className="text-sm text-gray-500">
            {isParent ? t('modal.parent') : t('modal.child')}
          </p>
        </div>

        {isParent ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('modal.codeLabel')}</label>
            <input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base font-mono tracking-widest text-center focus:outline-none"
              placeholder="XXXXXXXX"
              maxLength={12}
            />
          </div>
        ) : createInvite.data ? (
          <div className="rounded-2xl bg-gray-50 p-5 text-center space-y-4">
            <p className="text-sm text-gray-500">{t('modal.codeShare')}</p>
            <div className="text-3xl font-bold tracking-[0.25em] text-gray-900 font-mono">
              {createInvite.data.code}
            </div>
            <CopyButton
              value={createInvite.data.code}
              label={t('modal.copyCode')}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          </div>
        ) : null}

        {!isParent && !createInvite.data && (
          <div>
          <p className="text-sm font-medium text-gray-700 mb-2">{t('modal.toneLabel')}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'light', label: t('modal.toneLight') },
              { value: 'deep', label: t('modal.toneDeep') },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTone(opt.value as 'light' | 'deep')}
                className="p-3 rounded-xl border-2 text-center text-sm font-medium transition-all"
                style={{
                  borderColor: tone === opt.value ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: tone === opt.value ? '#EFF7F2' : 'white',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          </div>
        )}

        {createInvite.isError && <p className="text-sm text-red-500">{createInvite.error.message}</p>}
        {acceptInvite.isError && <p className="text-sm text-red-500">{acceptInvite.error.message}</p>}

        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
            {tc('actions.cancel')}
          </button>
          {isParent ? (
            <button
              onClick={() => acceptInvite.mutate({ inviteCode: normalizedInviteCode })}
              disabled={acceptInvite.isPending || normalizedInviteCode.length < 4}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {acceptInvite.isPending ? t('modal.connecting') : t('modal.connect')}
            </button>
          ) : (
            <button
              onClick={() => createInvite.mutate({ tone, regenerate: !!createInvite.data })}
              disabled={createInvite.isPending}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {createInvite.isPending ? t('modal.generating') : createInvite.data ? t('modal.remake') : t('modal.makeCode')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 부모용 — 피드에서 바로 답변 (3가지 방식 + 공개 설정)
function InlineAnswer({ questionId, connectionId }: { questionId: string; connectionId: string }) {
  const { t } = useTranslation('feed');
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
        {t('answer')}
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
      <AnswerComposer
        questionId={questionId}
        compact
        onDone={() => {
          setOpen(false);
          void utils.question.list.invalidate({ connectionId });
        }}
      />
      <button onClick={() => setOpen(false)} className="mt-2 text-xs text-gray-400 hover:text-gray-600">
        {t('collapse')}
      </button>
    </div>
  );
}

// 부모용 — 자기 답변의 공개/비공개 전환
// 단일 출처: react-query 캐시. 탭 즉시 캐시를 낙관적으로 뒤집어 한 번에 전환되게 하고,
// 서버 저장 실패 시 원복 + 안내한다.
type ListInput = { connectionId: string; limit: number };

function VisibilityToggle({ answerId, isPrivate, listInput }: { answerId: string; isPrivate: boolean; listInput: ListInput }) {
  const { t } = useTranslation('feed');
  const toast = useToast();
  const utils = trpc.useUtils();
  const toggle = trpc.answer.setVisibility.useMutation({
    onMutate: async ({ isPrivate: next }) => {
      await utils.question.list.cancel(listInput);
      const prev = utils.question.list.getData(listInput);
      utils.question.list.setData(listInput, (old) =>
        old
          ? {
              ...old,
              questions: old.questions.map((q) =>
                q.answer && q.answer.id === answerId
                  ? { ...q, answer: { ...q.answer, isPrivate: next } }
                  : q,
              ),
            }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) utils.question.list.setData(listInput, context.prev);
      toast.error(t('visChangeError'));
    },
    onSettled: () => void utils.question.list.invalidate(listInput),
  });

  return (
    <button
      onClick={() => toggle.mutate({ answerId, isPrivate: !isPrivate })}
      aria-pressed={!isPrivate}
      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors"
      style={isPrivate
        ? { borderColor: '#D1D5DB', color: '#6B7280', backgroundColor: '#F9FAFB' }
        : { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: '#EFF7F2' }}
      title={t('visToggleTitle')}
    >
      {isPrivate ? t('visPrivate') : t('visPublic')}
    </button>
  );
}

export default function FeedPage() {
  const { t, i18n } = useTranslation('feed');
  const me = trpc.auth.me.useQuery();
  const connections = trpc.connection.list.useQuery(undefined, { refetchInterval: 30_000 });
  const firstConn = connections.data?.[0];
  const utils = trpc.useUtils();
  const [showStart, setShowStart] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const listInput: ListInput = { connectionId: firstConn?.id ?? '', limit: 20 };
  const questions = trpc.question.list.useQuery(listInput, { enabled: !!firstConn?.id });

  if (connections.isLoading || me.isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        <div className="animate-spin text-2xl">🌀</div>
      </div>
    );
  }

  if (!firstConn) {
    const isParent = me.data?.role === 'parent';

    return (
      <>
        <div className="text-center space-y-4 py-12">
          <div className="text-5xl">💌</div>
          <div>
            <p className="text-gray-700 font-medium">{t('noConnection.title')}</p>
            <p className="text-sm text-gray-400 mt-1">
              {isParent ? t('noConnection.parent') : t('noConnection.child')}
            </p>
          </div>
          <button
            onClick={() => setShowStart(true)}
            className="px-6 py-3 rounded-2xl text-white font-medium"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('startConnect')}
          </button>
        </div>
        {showStart && <StartConnectionModal role={me.data?.role ?? 'child'} onClose={() => setShowStart(false)} />}
      </>
    );
  }

  const items = questions.data?.questions ?? [];
  const isParentView = firstConn.fromUserId === me.data?.id; // 부모(답변자) 시점인가
  const otherUser = isParentView ? firstConn.toUser : firstConn.fromUser;
  const connectedDate = new Date(firstConn.createdAt).toLocaleDateString(i18n.language, { month: 'long', day: 'numeric' });

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {t('header.title', { name: otherUser?.name })}
          </h2>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: otherUser?.isOnline ? '#22C55E' : '#D1D5DB' }}
            />
            {otherUser?.isOnline ? t('header.online') : t('header.offline')}
          </div>
        </div>
        {!isParentView ? (
          <button
            onClick={() => setShowComposer(true)}
            className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('header.sendQuestion')}
          </button>
        ) : (
          <button
            onClick={() => setShowMessage(true)}
            className="text-sm font-semibold px-4 py-2.5 rounded-full text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
            aria-label={t('header.shareHeart')}
          >
            {t('header.shareHeart')}
          </button>
        )}
      </div>

      {showMessage && (
        <ParentMessageComposer
          connectionId={firstConn.id}
          childName={firstConn.toUser?.name ?? t('defaultChild', { ns: 'today' })}
          onClose={() => setShowMessage(false)}
          onSent={() => void utils.question.list.invalidate({ connectionId: firstConn.id })}
        />
      )}

      {showComposer && (
        <QuestionComposer
          connectionId={firstConn.id}
          parentName={firstConn.fromUser?.name ?? t('defaultParent', { ns: 'today' })}
          onClose={() => setShowComposer(false)}
          onSent={() => void utils.question.list.invalidate({ connectionId: firstConn.id })}
        />
      )}

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
        <div className="flex gap-3">
          <span className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#EFF7F2' }}>
            🔗
          </span>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {t('connectedNotice', { from: firstConn.fromUser?.name, to: firstConn.toUser?.name })}
            </p>
            <p className="text-xs text-gray-400">{connectedDate}</p>
          </div>
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="text-4xl">🌱</div>
          {isParentView ? (
            <p className="text-gray-500">{t('emptyParent')}</p>
          ) : (
            <>
              <p className="text-gray-500">{t('emptyChildPrompt')}</p>
              <button
                onClick={() => setShowComposer(true)}
                className="px-6 py-3 rounded-2xl text-white font-medium"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {t('sendToday')}
              </button>
            </>
          )}
        </div>
      )}

      {items.map((q) => (
        <div key={q.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-3">
          {/* 질문 — 부모가 먼저 전한 마음은 별도 헤더로 */}
          {q.source === 'parent_message' ? (
            <div className="flex gap-2 items-center">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FDF2F8', color: '#DB2777' }}>
                💝
              </span>
              <p className="text-sm font-medium flex-1" style={{ color: '#DB2777' }}>
                {t('parentMessaged', { name: firstConn.fromUser?.name })}
              </p>
            </div>
          ) : (
            <div className="flex gap-2 items-start">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                Q
              </span>
              <p className="text-sm text-gray-600 flex-1">{q.body}</p>
            </div>
          )}

          {/* 답변 */}
          {q.answer && !q.answer.skipped ? (
            (q.answer as { masked?: boolean }).masked ? (
              /* 자녀 시점 — 부모가 비공개로 간직한 답변 */
              <div className="pl-7">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-gray-400">
                  <span className="text-lg">🔒</span>
                  <p className="text-sm">
                    {t('privateMasked', { name: firstConn.fromUser?.name })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="pl-7 space-y-2">
                <AnswerMedia answer={q.answer} />
                {q.answer.body && (
                  <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">{q.answer.body}</p>
                )}

                {/* 부모 본인 답변이면 공개/비공개 전환 */}
                {isParentView && (
                  <VisibilityToggle
                    answerId={q.answer.id}
                    isPrivate={q.answer.isPrivate}
                    listInput={listInput}
                  />
                )}

                {/* 반응들 */}
                {q.answer.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {q.answer.reactions.map((r) => (
                      <span key={r.id} className="inline-flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded-full">
                        {r.emoji && <span>{r.emoji}</span>}
                        {r.comment && <span className="text-gray-600">{r.comment}</span>}
                      </span>
                    ))}
                  </div>
                )}

                {/* 자녀만 반응 가능 */}
                {!isParentView && <ReactionBar answerId={q.answer.id} connectionId={firstConn.id} />}
              </div>
            )
          ) : q.answer?.skipped ? (
            <div className="pl-7">
              <span className="text-sm text-gray-400 italic">{t('skipped')}</span>
            </div>
          ) : (
            <div className="pl-7 space-y-2">
              {isParentView ? (
                <InlineAnswer questionId={q.id} connectionId={firstConn.id} />
              ) : (
                <span className="text-sm text-gray-400">{t('waiting')}</span>
              )}
            </div>
          )}

          {/* 날짜 */}
          {q.sentAt && (
            <p className="text-xs text-gray-300 pl-7">
              {new Date(q.sentAt).toLocaleDateString(i18n.language, { month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
