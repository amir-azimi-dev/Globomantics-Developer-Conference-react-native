import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/Button";
import { useSignOutMutation } from "~/RTK/graphql/generated";
import { removeCredentials } from "~/RTK/slices/auth";
import { UseAppDispatch } from "~/RTK/state/store";

export default function Home() {
  const [signOut] = useSignOutMutation();
  const dispatch = UseAppDispatch();

  const logoutHandler = async (): Promise<void> => {
    const result = await signOut({});
    if (result.error) return Alert.alert("Operation Failed!", "There was an error when signing out!");

    dispatch(removeCredentials());
    router.replace("..");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="mb-6 font-bold text-3xl">Home Screen</Text>

      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
}