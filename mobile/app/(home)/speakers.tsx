import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SpeakerItem from "~/components/SpeakerItem";
import { useSpeakersQuery } from "~/RTK/graphql/generated";

export default function Speakers() {
  const { data, isFetching, isLoading, isError, refetch } = useSpeakersQuery({});

  if (isLoading) return <ActivityIndicator size="large" className="flex-1" />;
  if (isError) return <Text className="my-auto font-bold text-2xl text-center">Error While Loading Data!</Text>

  return (
    <View>
      <FlatList
        data={data?.speakers || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SpeakerItem {...item} />}
        ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
}