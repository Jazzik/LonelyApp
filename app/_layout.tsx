import { Stack } from 'expo-router';
console.log('_layout.tsx');




export default function Layout() {
  
    return (
      
      <Stack screenOptions={{contentStyle:{
        backgroundColor:'#442380'},
        
      headerShown: false
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  }