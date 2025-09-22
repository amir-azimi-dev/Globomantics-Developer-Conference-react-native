import { api } from "./generated";

const enhancedApi = api.enhanceEndpoints({
    addTagTypes: ["Sessions", "Speakers", "UserFavorites", "FavoriteSessions"],
    endpoints: {
        Sessions: {
            providesTags: ["Sessions"]
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
        MarkSessionAsFavorite: {
            invalidatesTags: ["UserFavorites", "FavoriteSessions"]
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