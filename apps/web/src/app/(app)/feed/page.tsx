'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

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

export default function FeedPage() {
  const connections = trpc.connection.list.useQuery();
  const firstConn = connections.data?.[0];

  const questions = trpc.question.list.useQuery(
    { connectionId: firstConn?.id ?? '', limit: 20 },
    { enabled: !!firstConn?.id },
  );

  if (connections.isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        <div className="animate-spin text-2xl">🌀</div>
      </div>
    );
  }

  if (!firstConn) {
    return (
      <div className="text-center space-y-4 py-12">
        <div className="text-5xl">💌</div>
        <div>
          <p className="text-gray-700 font-medium">아직 연결된 관계가 없어요</p>
          <p className="text-sm text-gray-400 mt-1">부모님을 초대하거나 초대 코드를 입력해보세요</p>
        </div>
        <button
          className="px-6 py-3 rounded-2xl text-white font-medium"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          연결 시작하기
        </button>
      </div>
    );
  }

  const items = questions.data?.questions ?? [];

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          {firstConn.fromUser?.name}님과의 이야기
        </h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {items.length}개의 답변
        </span>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="text-4xl">🌱</div>
          <p className="text-gray-500">첫 번째 질문을 보내볼까요?</p>
          <button
            onClick={() => {}}
            className="px-6 py-3 rounded-2xl text-white font-medium"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            오늘의 질문 보내기
          </button>
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

              <ReactionBar answerId={q.answer.id} connectionId={firstConn.id} />
            </div>
          ) : q.answer?.skipped ? (
            <div className="pl-7">
              <span className="text-sm text-gray-400 italic">건너뛰었어요</span>
            </div>
          ) : (
            <div className="pl-7">
              <span className="text-sm text-gray-400">아직 답변을 기다리고 있어요...</span>
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
