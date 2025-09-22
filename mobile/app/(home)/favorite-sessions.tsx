import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import FavoriteSessionItem from "~/components/FavoriteSessionItem";
import { useFavoriteSessionsQuery, useMarkSessionAsFavoriteMutation } from "~/RTK/graphql/enhanced";
import { Session } from "~/types";

export default function FavoriteSessions() {
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const { data, isFetching, isLoading, isError, refetch } = useFavoriteSessionsQuery({});
  const [removeFavorite] = useMarkSessionAsFavoriteMutation();

  const manipulateSessions = (sessions: Session[]): Session[] => {
    return sessions.map(session => ({
      ...session,
      title: session.title.length > 30 ? session.title.substring(0, 30) : session.title
    }))
  };

  const removeFavoriteHandler = async (id: string): Promise<void> => {
    if (isFetchingData) return;

    setIsFetchingData(true);
    const result = await removeFavorite({ id });
    setIsFetchingData(false);

    if (result.error) return Alert.alert("Error", "Error while making this item as favorite!");
  };

  if (isLoading) return <ActivityIndicator size="large" className="flex-1" />;
  if (isError) return <Text className="my-auto font-bold text-2xl text-center">Error While Loading Data!</Text>

  const userFavoriteSessionsIds = data?.me?.favorites || [];

  return (
    <View className={(isFetchingData) ? "opacity-50" : "opacity-100"}>
      {!userFavoriteSessionsIds.length ? (
        <View className="h-full justify-center items-center">
          <Text className="font-bold text-2xl text-center">No Favorite Session Yet!</Text>
        </View>
      ) : (
        <FlatList
          data={manipulateSessions(userFavoriteSessionsIds)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FavoriteSessionItem
              {...item}
              onRemoveFavorite={removeFavoriteHandler}
            />
          )}
          ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
          onRefresh={refetch}
          refreshing={isFetching}
        />
      )}
    </View>
  );
}