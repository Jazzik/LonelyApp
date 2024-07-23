import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { Image, View } from 'react-native'; // Import the correct component for Image

console.log('_layout.tsx');

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 30 }}> 
          <View style={{ flex: 1 }} /> 
          <View style={{
            width: 40, // Circle size
            height: 40, // Circle size
            borderRadius: 25, // Half of the width/height to make it a circle
            backgroundColor: 'red', // Circle color
            justifyContent: 'center', // Center the image vertically
            alignItems: 'center', // Center the image horizontally
          }}>
            <Image
              source={require('../assets/images/favicon.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </View>
      )
    }}>
      <Stack.Screen name="(tabs)"  options={{ headerShown: true, headerStyle: { backgroundColor: Colors.dark.upper_background } }} />
    </Stack>
  );
}