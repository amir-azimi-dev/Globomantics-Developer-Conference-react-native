import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { Button } from "~/components/Button";
import SessionItem from "~/components/SessionItem";
import { useMarkSessionAsFavoriteMutation, useSessionsQuery, useUserFavoritesQuery } from "~/RTK/graphql/enhanced";
import { Session } from "~/types";

export default function Index() {
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    const { data, isFetching, isLoading, isError, refetch } = useSessionsQuery({});
    const {
        data: userFavorites,
        isFetching: isFetchingFavorites,
        isLoading: isLoadingFavorites,
        isError: isErrorFavorites,
        refetch: refetchFavorites
    } = useUserFavoritesQuery({});

    const [markFavorite] = useMarkSessionAsFavoriteMutation();

    const manipulateSessions = (sessions: Session[]): Session[] => {
        return sessions.map(session => ({
            ...session,
            title: session.title.length > 30 ? session.title.substring(0, 30) : session.title
        }))
    };

    const toggleFavoriteStatusHandler = async (id: string): Promise<void> => {
        if (isFetchingData) return;

        setIsFetchingData(true);
        const result = await markFavorite({ id });
        setIsFetchingData(false);

        if (result.error) return Alert.alert("Error", "Error while making this item as favorite!");
    };

    if (isLoading || isLoadingFavorites) return <ActivityIndicator size="large" className="flex-1" />;
    if (isError || isErrorFavorites) return <Text className="my-auto font-bold text-2xl text-center">Error While Loading Data!</Text>

    const userFavoriteSessionsIds = userFavorites?.me?.favorites.map((item: { id: string }) => item.id) || [];

    return (
        <View className={`flex-1 ${(isFetchingData || isFetchingFavorites) ? "opacity-50" : "opacity-100"}`}>
            <FlatList
                data={data ? manipulateSessions(data.sessions) : []}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SessionItem
                        {...item}
                        onToggleFavoriteStatus={toggleFavoriteStatusHandler}
                        isFavorite={userFavoriteSessionsIds.includes(item.id)}
                    />
                )}
                ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
                onRefresh={() => {
                    refetch();
                    refetchFavorites();
                }}
                refreshing={isFetching || isFetchingFavorites}
            />

            <View className="p-4">
                <Link href="/(home)/sessions/new" asChild>
                    <Button title="Create New Session" />
                </Link>
            </View>
        </View>
    );
}