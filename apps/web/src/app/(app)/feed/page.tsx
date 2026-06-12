'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { QuestionComposer } from '@/components/QuestionComposer';
import { AnswerComposer } from '@/components/AnswerComposer';

function ReactionBar({ answerId, connectionId }: { answerId: string; connectionId: string }) {
  const [comment, setComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const utils = trpc.useUtils();

  const addReaction = trpc.reaction.add.useMutation({
    onSuccess: () => {
      setComment('');
      setShowInput(false);
      utils.question.list.invalidate({ connectionId });
    },
  });

  const EMOJIS = ['❤️', '😊', '😢', '👍', '🙏'];

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-2 flex-wrap">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => addReaction.mutate({ answerId, emoji })}
            className="px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-gray-100 transition-colors"
          >
            {emoji}
          </button>
        ))}
        <button
          onClick={() => setShowInput(!showInput)}
          className="px-3 py-1.5 bg-gray-50 rounded-full text-sm hover:bg-gray-100 transition-colors"
        >
          💬 댓글
        </button>
      </div>
      {showInput && (
        <div className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none"
            placeholder="댓글을 남겨요..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && comment.trim()) {
                addReaction.mutate({ answerId, comment: comment.trim() });
              }
            }}
          />
          <button
            onClick={() => comment.trim() && addReaction.mutate({ answerId, comment: comment.trim() })}
            className="px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            보내기
          </button>
        </div>
      )}
    </div>
  );
}

function StartConnectionModal({ role, onClose }: { role: 'child' | 'parent' | 'both'; onClose: () => void }) {
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
          <h2 className="text-lg font-bold text-gray-900">연결 시작하기</h2>
          <p className="text-sm text-gray-500">
            {isParent ? '자녀가 만든 초대 코드를 입력해주세요.' : '부모님께 전달할 초대 코드를 만들어요.'}
          </p>
        </div>

        {isParent ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">초대 코드</label>
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
            <p className="text-sm text-gray-500">부모님께 전달할 코드</p>
            <div className="text-3xl font-bold tracking-[0.25em] text-gray-900 font-mono">
              {createInvite.data.code}
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(createInvite.data.code)}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              코드 복사하기
            </button>
          </div>
        ) : null}

        {!isParent && !createInvite.data && (
          <div>
          <p className="text-sm font-medium text-gray-700 mb-2">대화 톤</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'light', label: '🌸 가벼운 추억' },
              { value: 'deep', label: '🌊 깊은 이야기' },
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
            취소
          </button>
          {isParent ? (
            <button
              onClick={() => acceptInvite.mutate({ inviteCode: normalizedInviteCode })}
              disabled={acceptInvite.isPending || normalizedInviteCode.length < 4}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {acceptInvite.isPending ? '연결 중...' : '연결하기'}
            </button>
          ) : (
            <button
              onClick={() => createInvite.mutate({ tone, regenerate: !!createInvite.data })}
              disabled={createInvite.isPending}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {createInvite.isPending ? '생성 중...' : createInvite.data ? '다시 만들기' : '코드 만들기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 부모용 — 피드에서 바로 답변 (3가지 방식 + 공개 설정)
function InlineAnswer({ questionId, connectionId }: { questionId: string; connectionId: string }) {
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
        ✍️ 답변하기
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
        접기
      </button>
    </div>
  );
}

// 부모용 — 자기 답변의 공개/비공개 전환
function VisibilityToggle({ answerId, isPrivate, connectionId }: { answerId: string; isPrivate: boolean; connectionId: string }) {
  const utils = trpc.useUtils();
  const toggle = trpc.answer.setVisibility.useMutation({
    onSuccess: () => void utils.question.list.invalidate({ connectionId }),
  });

  return (
    <button
      onClick={() => toggle.mutate({ answerId, isPrivate: !isPrivate })}
      disabled={toggle.isPending}
      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors disabled:opacity-50"
      style={isPrivate
        ? { borderColor: '#D1D5DB', color: '#6B7280', backgroundColor: '#F9FAFB' }
        : { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: '#EFF7F2' }}
      title="눌러서 공개 설정 변경"
    >
      {toggle.isPending ? '변경 중...' : isPrivate ? '🔒 비공개 (눌러서 공개)' : '💌 공개됨 (눌러서 비공개)'}
    </button>
  );
}

export default function FeedPage() {
  const me = trpc.auth.me.useQuery();
  const connections = trpc.connection.list.useQuery(undefined, { refetchInterval: 30_000 });
  const firstConn = connections.data?.[0];
  const utils = trpc.useUtils();
  const [showStart, setShowStart] = useState(false);
  const [showComposer, setShowComposer] = useState(false);

  const questions = trpc.question.list.useQuery(
    { connectionId: firstConn?.id ?? '', limit: 20 },
    { enabled: !!firstConn?.id },
  );

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
            <p className="text-gray-700 font-medium">아직 연결된 관계가 없어요</p>
            <p className="text-sm text-gray-400 mt-1">
              {isParent ? '자녀에게 받은 초대 코드를 입력해주세요' : '초대 코드를 만들어 부모님께 보내주세요'}
            </p>
          </div>
          <button
            onClick={() => setShowStart(true)}
            className="px-6 py-3 rounded-2xl text-white font-medium"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            연결 시작하기
          </button>
        </div>
        {showStart && <StartConnectionModal role={me.data?.role ?? 'child'} onClose={() => setShowStart(false)} />}
      </>
    );
  }

  const items = questions.data?.questions ?? [];
  const isParentView = firstConn.fromUserId === me.data?.id; // 부모(답변자) 시점인가
  const otherUser = isParentView ? firstConn.toUser : firstConn.fromUser;
  const connectedDate = new Date(firstConn.createdAt).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {otherUser?.name}님과의 이야기
          </h2>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: otherUser?.isOnline ? '#22C55E' : '#D1D5DB' }}
            />
            {otherUser?.isOnline ? '접속중' : '미접속중'}
          </div>
        </div>
        {!isParentView && (
          <button
            onClick={() => setShowComposer(true)}
            className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            + 질문 보내기
          </button>
        )}
      </div>

      {showComposer && (
        <QuestionComposer
          connectionId={firstConn.id}
          parentName={firstConn.fromUser?.name ?? '부모님'}
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
              {firstConn.fromUser?.name}님과 {firstConn.toUser?.name}님이 연결되었어요.
            </p>
            <p className="text-xs text-gray-400">{connectedDate}</p>
          </div>
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="text-4xl">🌱</div>
          {isParentView ? (
            <p className="text-gray-500">자녀가 질문을 보내면 여기에 표시돼요</p>
          ) : (
            <>
              <p className="text-gray-500">첫 번째 질문을 보내볼까요?</p>
              <button
                onClick={() => setShowComposer(true)}
                className="px-6 py-3 rounded-2xl text-white font-medium"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                오늘의 질문 보내기
              </button>
            </>
          )}
        </div>
      )}

      {items.map((q) => (
        <div key={q.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-3">
          {/* 질문 */}
          <div className="flex gap-2 items-start">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--color-primary-light)' }}>
              Q
            </span>
            <p className="text-sm text-gray-600 flex-1">{q.body}</p>
          </div>

          {/* 답변 */}
          {q.answer && !q.answer.skipped ? (
            (q.answer as { masked?: boolean }).masked ? (
              /* 자녀 시점 — 부모가 비공개로 간직한 답변 */
              <div className="pl-7">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-gray-400">
                  <span className="text-lg">🔒</span>
                  <p className="text-sm">
                    {firstConn.fromUser?.name}님이 답변을 남기셨지만, 마음속에 간직하기로 했어요.
                  </p>
                </div>
              </div>
            ) : (
              <div className="pl-7 space-y-2">
                {q.answer.format === 'photo' && q.answer.mediaUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={q.answer.mediaUrl} alt="사진 답변" className="rounded-xl max-h-64 object-cover" />
                )}
                {q.answer.body && (
                  <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">{q.answer.body}</p>
                )}
                {q.answer.transcript && (
                  <p className="text-sm text-gray-500 italic">🎤 {q.answer.transcript}</p>
                )}

                {/* 부모 본인 답변이면 공개/비공개 전환 */}
                {isParentView && (
                  <VisibilityToggle
                    answerId={q.answer.id}
                    isPrivate={q.answer.isPrivate}
                    connectionId={firstConn.id}
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
              <span className="text-sm text-gray-400 italic">건너뛰었어요</span>
            </div>
          ) : (
            <div className="pl-7 space-y-2">
              {isParentView ? (
                <InlineAnswer questionId={q.id} connectionId={firstConn.id} />
              ) : (
                <span className="text-sm text-gray-400">아직 답변을 기다리고 있어요...</span>
              )}
            </div>
          )}

          {/* 날짜 */}
          {q.sentAt && (
            <p className="text-xs text-gray-300 pl-7">
              {new Date(q.sentAt).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
