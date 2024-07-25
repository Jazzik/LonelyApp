import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { Image, View } from 'react-native'; // Import the correct component for Image

export default function Layout() {
  return (
    <Stack screenOptions={{ 
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 40 }}> 
          <View style={{ flex: 1 }} /> 
          <View style={{
            width: 40, // Circle size
            height: 40, // Circle size
            borderRadius: 20, // Half of the width/height to make it a circle
            backgroundColor: 'red', // Circle color
            justifyContent: 'center', // Center the image vertically
            alignItems: 'center', // Center the image horizontally
          }}>
            <Image
              source={require('@/assets/images/user/default-photo.png')}
              style={{ width: 40, height: 40,  borderRadius: 20}}
            />
          </View>
        </View>
      ), 
      
    }}>
      <Stack.Screen name="(tabs)"  options={{ headerShown: true, headerStyle: { backgroundColor: Colors.dark.upper_background, } }} />
      <Stack.Screen name="login"  options={{ headerShown: false, headerStyle: { backgroundColor: Colors.dark.upper_background, } }} />
      <Stack.Screen 
        name="tasks" 
        options={{ 
          headerShown: true, 
          headerStyle: { backgroundColor: Colors.dark.upper_background },
          headerBackTitle: 'Back',
          headerBackTitleStyle: {fontSize: 20},
          
        }} 
      />
    </Stack>
  );
}
