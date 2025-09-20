import { Tabs } from "expo-router";
import { TabBarIcon } from "../../components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{ href: null }}
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
