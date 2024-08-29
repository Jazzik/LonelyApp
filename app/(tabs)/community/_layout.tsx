import { Tabs } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
export default function CommunityLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="friends"  />
      <Tabs.Screen name="threads" />
    </Tabs>
  );
}
