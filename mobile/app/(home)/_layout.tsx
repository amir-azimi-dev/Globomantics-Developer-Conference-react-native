import { Redirect, Tabs } from "expo-router";
import { TabBarIcon } from "../../components/TabBarIcon";
import { useAppSelector } from "~/RTK/state/store";

export default function TabLayout() {
  const userInfo = useAppSelector(state => state.auth);

  if (!userInfo.token) <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="favorite-sessions"
        options={{
          title: "Favorite Sessions",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-o" color={color} />
        }}
      />
      <Tabs.Screen
        name="speakers"
        options={{
          title: "Speakers",
          tabBarIcon: ({ color }) => <TabBarIcon name="group" color={color} />
        }}
      />
    </Tabs>
  );
}
