import {Stack} from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"

function RootLayout() {
  return (
    <SafeAreaProvider> 
    <Stack>
        
        <Stack.Screen name="index" />

    </Stack>
    </SafeAreaProvider>
  )
}