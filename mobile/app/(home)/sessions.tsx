import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SessionItem from "~/components/SessionItem";
import { useSessionsQuery } from "~/RTK/graphql/generated";
import { Session } from "~/types";

export default function Sessions() {
  const { data, isFetching, isLoading, isError, refetch } = useSessionsQuery({});

  const manipulateSessions = (sessions: Session[]): Session[] => {
    return sessions.map(session => ({
      ...session,
      title: session.title.length > 30 ? session.title.substring(0, 30) : session.title
    }))
  };

  if (isLoading) return <ActivityIndicator size="large" className="flex-1" />;
  if (isError) return <Text className="my-auto font-bold text-2xl text-center">Error While Loading Data!</Text>

  return (
    <View>
      <FlatList
        data={data ? manipulateSessions(data.sessions) : []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SessionItem {...item} />}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
}