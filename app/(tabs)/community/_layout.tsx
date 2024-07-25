import { Tabs } from "expo-router";

export default function CommunityLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="friends" />
      <Tabs.Screen name="threads" />
    </Tabs>
  );
}
