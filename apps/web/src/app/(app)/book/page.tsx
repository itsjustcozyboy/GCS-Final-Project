'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import type { BookEdition } from '@maeum/db';

type ChapterEntry = { markdown?: string | null; followupQuestions?: string[] | null };
type ChapterData = Record<string, ChapterEntry>;

function BookPreview({ edition }: { edition: BookEdition & { chapterData: ChapterData | null } }) {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const chapters = edition.chapterData ? Object.entries(edition.chapterData) : [];

  return (
    <div className="space-y-4">
      {chapters.map(([name, data]) => (
        <div key={name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50">
          <button
            onClick={() => setActiveChapter(activeChapter === name ? null : name)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{name}</span>
            <span className="text-gray-400">{activeChapter === name ? '▲' : '▼'}</span>
          </button>
          {activeChapter === name && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed mt-3 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: (data.markdown ?? '').replace(/\n/g, '<br/>') }}
              />
              {data.followupQuestions.length > 0 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-xl">
                  <p className="text-xs font-medium text-amber-700 mb-2">💡 이런 이야기도 들어보면 어떨까요?</p>
                  {data.followupQuestions.map((q, i) => (
                    <p key={i} className="text-sm text-amber-600 mt-1">• {q}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookPage() {
  const connections = trpc.connection.list.useQuery();
  const firstConn = connections.data?.[0];
  const utils = trpc.useUtils();

  const books = trpc.book.list.useQuery(
    { connectionId: firstConn?.id ?? '' },
    { enabled: !!firstConn?.id },
  );

  const generateBook = trpc.book.generate.useMutation({
    onSuccess: () => utils.book.list.invalidate({ connectionId: firstConn?.id ?? '' }),
  });

  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const bookDetail = trpc.book.get.useQuery(
    { id: selectedBook ?? '' },
    { enabled: !!selectedBook },
  );

  if (!firstConn) {
    return (
      <div className="text-center py-16 text-gray-400 space-y-3">
        <div className="text-5xl">📖</div>
        <p>연결된 관계가 없어요</p>
      </div>
    );
  }

  if (selectedBook && bookDetail.data) {
    const edition = bookDetail.data as typeof bookDetail.data & { chapterData: ChapterData | null };
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedBook(null)} className="text-gray-400">← 목록</button>
          <h2 className="text-lg font-bold text-gray-900">
            {edition.editionType === 'interim' ? '📖 중간판' : '📚 최종판'}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(edition.rangeFrom).toLocaleDateString('ko-KR')} ~{' '}
          {edition.rangeTo ? new Date(edition.rangeTo).toLocaleDateString('ko-KR') : '현재'}
        </p>
        <BookPreview edition={edition} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">📖 이야기 책</h2>
        <button
          onClick={() => generateBook.mutate({ connectionId: firstConn.id, editionType: 'interim' })}
          disabled={generateBook.isPending}
          className="text-sm px-4 py-2 rounded-xl text-white font-medium disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {generateBook.isPending ? '생성 중...' : '새 책 만들기'}
        </button>
      </div>

      {books.data?.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="text-5xl">📝</div>
          <div>
            <p className="text-gray-700 font-medium">아직 책이 없어요</p>
            <p className="text-sm text-gray-400 mt-1">답변이 쌓이면 책으로 엮을 수 있어요</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {books.data?.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBook(b.id)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 text-left hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{b.editionType === 'interim' ? '📖' : '📚'}</span>
            <div>
              <p className="font-semibold text-gray-900">
                {b.editionType === 'interim' ? '중간판' : '최종판'}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(b.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EFF7F2', color: 'var(--color-primary)' }}>
              {b.status === 'generated' ? '완성' : b.status === 'delivered' ? '전달됨' : '초안'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
