import { Stack } from "expo-router";
import "../global.css";
import { Provider } from "react-redux";
import store from "~/RTK/state/store";


export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
