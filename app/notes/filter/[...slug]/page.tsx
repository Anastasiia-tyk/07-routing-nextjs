// app/notes/page.tsx

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
    const queryClient = new QueryClient();
    const defaultPage = 1;
    const defaultPerPage = 12;
    const defaultSearch = "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", defaultPage, defaultSearch],
        queryFn: () => fetchNotes(defaultPage, defaultPerPage, defaultSearch),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    )
}