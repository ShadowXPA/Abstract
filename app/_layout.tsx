import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="preparation/index" />
      <Stack.Screen name="play/index" />
      <Stack.Screen name="how-to-play/index" />
      <Stack.Screen name="about/index" />
    </Stack>
  );
}
