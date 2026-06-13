'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import type { BookEdition } from '@maeum/db';
import { useTranslation } from 'react-i18next';

type ChapterEntry = { markdown?: string | null; followupQuestions?: string[] | null };
type ChapterData = Record<string, ChapterEntry>;

function BookPreview({ edition }: { edition: BookEdition & { chapterData: ChapterData | null } }) {
  const { t } = useTranslation('book');
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const chapters: [string, ChapterEntry][] = edition.chapterData
    ? (Object.entries(edition.chapterData) as [string, ChapterEntry][]).filter(([, v]) => v != null)
    : [];

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
              {(data.followupQuestions?.length ?? 0) > 0 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-xl">
                  <p className="text-xs font-medium text-amber-700 mb-2">{t('followupHeading')}</p>
                  {(data.followupQuestions ?? []).map((q, i) => (
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
  const { t, i18n } = useTranslation('book');
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
        <p>{t('noConnection')}</p>
      </div>
    );
  }

  if (selectedBook && bookDetail.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const edition = bookDetail.data as any as BookEdition & { chapterData: ChapterData | null };
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedBook(null)} className="text-gray-400">{t('backList')}</button>
          <h2 className="text-lg font-bold text-gray-900">
            {edition.editionType === 'interim' ? t('interimTitle') : t('finalTitle')}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(edition.rangeFrom).toLocaleDateString(i18n.language)} ~{' '}
          {edition.rangeTo ? new Date(edition.rangeTo).toLocaleDateString(i18n.language) : t('now')}
        </p>
        <BookPreview edition={edition} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{t('heading')}</h2>
        <button
          onClick={() => generateBook.mutate({ connectionId: firstConn.id, editionType: 'interim' })}
          disabled={generateBook.isPending}
          className="text-sm px-4 py-2 rounded-xl text-white font-medium disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {generateBook.isPending ? t('generating') : t('newBook')}
        </button>
      </div>

      {books.data?.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="text-5xl">📝</div>
          <div>
            <p className="text-gray-700 font-medium">{t('empty.title')}</p>
            <p className="text-sm text-gray-400 mt-1">{t('empty.subtitle')}</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {(books.data as BookEdition[] | undefined)?.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBook(b.id)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 text-left hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{b.editionType === 'interim' ? '📖' : '📚'}</span>
            <div>
              <p className="font-semibold text-gray-900">
                {b.editionType === 'interim' ? t('interim') : t('final')}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(b.createdAt).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EFF7F2', color: 'var(--color-primary)' }}>
              {b.status === 'generated' ? t('status.generated') : b.status === 'delivered' ? t('status.delivered') : t('status.draft')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
