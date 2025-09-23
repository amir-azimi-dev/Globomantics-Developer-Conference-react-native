import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/Button";
import { useMySessionsQuery, useSignOutMutation } from "~/RTK/graphql/generated";
import { removeCredentials } from "~/RTK/slices/auth";
import { UseAppDispatch, useAppSelector } from "~/RTK/state/store";
import UserSessionItem from "~/components/UserSessionItem";

export default function Home() {
  const userName = useAppSelector(state => state.auth.user?.name);
  const dispatch = UseAppDispatch();

  const { data, isLoading, isFetching, isError } = useMySessionsQuery({});
  const [signOut] = useSignOutMutation();

  const logoutHandler = async (): Promise<void> => {
    const result = await signOut({});
    if (result.error) return Alert.alert("Operation Failed!", "There was an error when signing out!");

    dispatch(removeCredentials());
    router.replace("..");
  };

  if (isLoading) return <ActivityIndicator size="large" className="flex-1" />;
  if (isError) return <Text className="my-auto font-bold text-2xl text-center">Error While Loading Data!</Text>

  const userSessions = data?.me?.speaker?.sessions || [];

  return (
    <View className="flex-1 p-4 bg-slate-50">
      <Text className="mb-6 pb-3 border-gray-300 border-b font-semibold text-2xl text-center">Welcome to the GDC, {userName}</Text>

      <Text className="mb-1 font-bold text-xl">My Sessions</Text>
      {userSessions.length ? (
        <FlatList
          data={userSessions}
          keyExtractor={session => session.id}
          renderItem={({ item: session }) => <UserSessionItem {...session} />}
          contentContainerClassName="gap-2"
        />
      ) : (
        <Text></Text>
      )}

      <Button title="Logout" className="mt-auto" onPress={logoutHandler} />
    </View>
  );
}