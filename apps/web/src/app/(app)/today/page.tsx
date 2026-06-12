'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { QuestionComposer } from '@/components/QuestionComposer';
import { AnswerComposer } from '@/components/AnswerComposer';
import { ParentMessageComposer } from '@/components/ParentMessageComposer';

// 부모 전용 — "먼저 마음 전하기" 큰 진입 버튼 + 작성 모달
function ParentMessageEntry({ connectionId, childName, onSent }: { connectionId: string; childName: string; onSent: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-5 rounded-2xl border-2 text-lg font-semibold transition-all hover:shadow-md"
        style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary-dark)', backgroundColor: '#EFF7F2' }}
        aria-label="먼저 마음 전하기"
      >
        💝 먼저 마음 전하기
        <span className="block text-sm font-normal text-gray-500 mt-1">
          질문을 기다리지 않고, 지금 떠오르는 마음을 {childName}님에게 남겨보세요
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
        <p className="text-gray-500">먼저 연결을 시작해보세요</p>
      </div>
    );
  }

  const question = todayQ.data;
  const isParent = firstConn.fromUserId === me.data?.id;
  const parentName = firstConn.fromUser?.name ?? '부모님';
  const childName = firstConn.toUser?.name ?? '자녀';

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
            <p className="text-xl text-gray-700 font-medium">아직 오늘의 질문이 도착하지 않았어요</p>
            <p className="text-base text-gray-400">자녀가 질문을 보내면 여기에 표시돼요</p>
          </div>
          <ParentMessageEntry connectionId={firstConn.id} childName={childName} onSent={refresh} />
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900">오늘의 질문</h2>
        <div className="text-center py-12 space-y-4">
          <div className="text-5xl">🌤️</div>
          <div>
            <p className="text-gray-700 font-medium">아직 오늘의 질문이 없어요</p>
            <p className="text-sm text-gray-400 mt-1">{parentName}님께 보낼 질문을 골라보세요</p>
          </div>
          <button
            onClick={() => setShowComposer(true)}
            className="px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            오늘의 질문 보내기
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
            <p className="text-2xl font-bold text-gray-900">고마워요!</p>
            <p className="text-lg text-gray-500">소중한 이야기가 잘 전달됐어요</p>
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
              오늘의 질문
            </span>
            <span className="text-xs text-gray-400">깊이 {question.depth}단계</span>
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
        <h2 className="text-lg font-bold text-gray-900">오늘의 질문</h2>
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-lg font-medium text-gray-700">{question.body}</p>
          <div className="border-t border-gray-100 pt-4">
            {a.skipped ? (
              <p className="text-gray-400 italic">건너뛰었어요</p>
            ) : a.masked ? (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-xl">🔒</span>
                <p className="text-sm">{parentName}님이 답변을 남기셨지만, 마음속에 간직하기로 했어요.</p>
              </div>
            ) : (
              <>
                {a.body && <p className="text-base text-gray-900 whitespace-pre-wrap">{a.body}</p>}
                <p className="text-xs text-green-600 mt-2">
                  ✅ 답변 완료{a.isPrivate ? ' · 🔒 비공개' : ''}
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
      <h2 className="text-lg font-bold text-gray-900">오늘의 질문</h2>
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
        <p className="text-lg font-medium text-gray-700">{question.body}</p>
        <p className="text-sm text-gray-400">⏳ {parentName}님의 답변을 기다리고 있어요...</p>
      </div>
    </div>
  );
}
