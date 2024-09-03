import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="preparation/index" options={{ headerTitle: 'Get ready' }} />
      <Stack.Screen name="play/index" options={{ headerTitle: '' }} />
      <Stack.Screen name="how-to-play/index" options={{ headerTitle: 'How to play' }} />
      <Stack.Screen name="about/index" options={{ headerTitle: 'About' }} />
    </Stack>
  );
}
