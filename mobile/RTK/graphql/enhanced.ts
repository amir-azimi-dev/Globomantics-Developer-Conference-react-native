import { api } from "./generated";

const enhancedApi = api.enhanceEndpoints({
    addTagTypes: ["Sessions", "UserSessions", "Speakers", "UserFavorites", "FavoriteSessions"],
    endpoints: {
        Sessions: {
            providesTags: ["Sessions"]
        },
        MySessions: {
            providesTags: ["UserSessions"]
        },
        Speakers: {
            providesTags: ["Speakers"]
        },
        UserFavorites: {
            providesTags: ["UserFavorites"]
        },
        FavoriteSessions: {
            providesTags: ["FavoriteSessions"]
        },
        CreateSession: {
            invalidatesTags: ["Sessions", "UserSessions"]
        },
        MarkSessionAsFavorite: {
            invalidatesTags: ["FavoriteSessions"],
            onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
                const userFavoritesDispatchResult = dispatch(
                    enhancedApi.util.updateQueryData(
                        "UserFavorites",
                        {},
                        draft => {
                            const currentFavoriteSessionsIds = draft?.me?.favorites?.map((item: { id: string }) => item.id);
                            if (currentFavoriteSessionsIds.includes(id)) {
                                draft.me.favorites = draft.me.favorites.filter((item: { id: string }) => item.id !== id);
                            } else {
                                draft.me.favorites.push({ id });
                            }
                        }
                    )
                );

                const favoriteSessionsDispatchResult = dispatch(
                    enhancedApi.util.updateQueryData(
                        "FavoriteSessions",
                        {},
                        draft => {
                            const currentFavoriteSessionsIds = draft?.me?.favorites?.map((item: { id: string }) => item.id);
                            if (currentFavoriteSessionsIds.includes(id)) {
                                draft.me.favorites = draft.me.favorites.filter((item: { id: string }) => item.id !== id);
                            }
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    userFavoritesDispatchResult.undo();
                    favoriteSessionsDispatchResult.undo();
                }
            }
        }
    }
});


export const {
    useSessionsQuery,
    useSpeakersQuery,
    useUserFavoritesQuery,
    useFavoriteSessionsQuery,
    useMarkSessionAsFavoriteMutation

} = enhancedApi;

export { enhancedApi as api };