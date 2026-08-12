import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import { INITIAL_PAGE, INITIAL_SEARCH, PER_PAGE } from '../../lib/constants';
import NotesClient from './Notes.client';

// Без цього Next.js пререндерив би сторінку статично на етапі збірки й показував
// знімок даних із моменту білду. Нам потрібен SSR на кожен запит.
export const dynamic = 'force-dynamic';

export default async function NotesPage() {
  // Новий QueryClient на кожен запит: серверний кеш не має шаритися
  // між користувачами.
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', INITIAL_PAGE, INITIAL_SEARCH],
    queryFn: () =>
      fetchNotes({
        page: INITIAL_PAGE,
        perPage: PER_PAGE,
        search: INITIAL_SEARCH,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
