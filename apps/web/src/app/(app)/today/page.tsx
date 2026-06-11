'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

export default function TodayPage() {
  const connections = trpc.connection.list.useQuery();
  const firstConn = connections.data?.[0];
  const utils = trpc.useUtils();

  const todayQ = trpc.question.today.useQuery(
    { connectionId: firstConn?.id ?? '' },
    { enabled: !!firstConn?.id },
  );

  const sendQuestion = trpc.question.send.useMutation({
    onSuccess: () => {
      utils.question.today.invalidate({ connectionId: firstConn?.id ?? '' });
      utils.question.list.invalidate({ connectionId: firstConn?.id ?? '' });
    },
  });

  const [answerText, setAnswerText] = useState('');
  const [format, setFormat] = useState<'text' | 'photo' | 'video' | 'audio'>('text');
  const [submitted, setSubmitted] = useState(false);

  const submitAnswer = trpc.answer.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      utils.question.today.invalidate({ connectionId: firstConn?.id ?? '' });
    },
  });

  const skipAnswer = trpc.answer.skip.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      utils.question.today.invalidate({ connectionId: firstConn?.id ?? '' });
    },
  });

  if (!firstConn) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-5xl">💌</div>
        <p className="text-gray-500">먼저 연결을 시작해보세요</p>
      </div>
    );
  }

  const question = todayQ.data;
  const isParent = firstConn.fromUserId === (typeof window !== 'undefined' ? localStorage.getItem('userId') : null);

  // 오늘 질문 없음 (자식 화면)
  if (!question && !isParent) {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900">오늘의 질문</h2>
        <div className="text-center py-12 space-y-4">
          <div className="text-5xl">🌤️</div>
          <div>
            <p className="text-gray-700 font-medium">아직 오늘의 질문이 없어요</p>
            <p className="text-sm text-gray-400 mt-1">버튼을 눌러 {firstConn.fromUser?.name}님께 질문을 보내보세요</p>
          </div>
          <button
            onClick={() => sendQuestion.mutate({ connectionId: firstConn.id })}
            disabled={sendQuestion.isPending}
            className="px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {sendQuestion.isPending ? '보내는 중...' : '오늘의 질문 보내기'}
          </button>
          {sendQuestion.data && (
            <p className="text-sm text-green-600">✅ 질문이 발송되었어요!</p>
          )}
          {sendQuestion.data && !(sendQuestion.data as { sent: boolean }).sent && (
            <p className="text-sm text-orange-500">⚠️ 현재 발송이 차단된 상태입니다</p>
          )}
        </div>
      </div>
    );
  }

  // 부모 화면 (답변 입력)
  if (isParent && question && !question.answer) {
    if (submitted) {
      return (
        <div className="text-center py-16 space-y-4">
          <div className="text-5xl">🙏</div>
          <p className="text-xl font-bold text-gray-900">고마워요!</p>
          <p className="text-gray-500">소중한 이야기가 잘 전달됐어요</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
              오늘의 질문
            </span>
            <span className="text-xs text-gray-400">깊이 {question.depth}단계</span>
          </div>
          <p className="text-2xl font-medium text-gray-900 leading-relaxed">{question.body}</p>
        </div>

        {/* 형식 선택 */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">어떻게 답할까요?</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'text', icon: '✍️', label: '글로 쓸게요' },
              { value: 'photo', icon: '📸', label: '사진을 보낼게요' },
              { value: 'video', icon: '🎥', label: '영상으로' },
              { value: 'audio', icon: '🎤', label: '목소리로' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFormat(f.value as typeof format)}
                className="p-3 rounded-xl border-2 flex items-center gap-2 text-sm font-medium transition-all"
                style={{
                  borderColor: format === f.value ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: format === f.value ? '#EFF7F2' : 'white',
                  color: format === f.value ? 'var(--color-primary-dark)' : '#6B6B6B',
                }}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 텍스트 입력 */}
        {format === 'text' && (
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-base leading-relaxed resize-none focus:outline-none"
            style={{ minHeight: '150px', fontSize: '18px' }}
            placeholder="편하게 이야기해주세요..."
          />
        )}

        {format !== 'text' && (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400 space-y-2">
            <div className="text-3xl">
              {format === 'photo' ? '📸' : format === 'video' ? '🎥' : '🎤'}
            </div>
            <p className="text-sm">
              {format === 'photo' ? '사진을 여기에 첨부하세요' : format === 'video' ? '영상을 업로드하세요' : '음성 녹음 기능은 앱에서 사용 가능해요'}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => skipAnswer.mutate({ questionId: question.id })}
            disabled={skipAnswer.isPending}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-500 font-medium"
          >
            다음에 할게요
          </button>
          <button
            onClick={() => submitAnswer.mutate({ questionId: question.id, format, body: answerText, receivedVia: 'app' })}
            disabled={submitAnswer.isPending || (format === 'text' && !answerText.trim())}
            className="flex-2 flex-grow py-3 rounded-2xl text-white font-semibold disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            답변 보내기
          </button>
        </div>
      </div>
    );
  }

  // 이미 답변함
  if (question?.answer) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">오늘의 질문</h2>
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-lg font-medium text-gray-700">{question.body}</p>
          <div className="border-t border-gray-100 pt-4">
            {question.answer.skipped ? (
              <p className="text-gray-400 italic">건너뛰었어요</p>
            ) : (
              <>
                {question.answer.body && (
                  <p className="text-base text-gray-900 whitespace-pre-wrap">{question.answer.body}</p>
                )}
                <p className="text-xs text-green-600 mt-2">✅ 답변 완료</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16 text-gray-400">
      <div className="animate-spin text-3xl">🌀</div>
    </div>
  );
}
