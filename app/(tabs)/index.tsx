import { Image } from "expo-image";
import { Platform, StyleSheet, Button, Alert, View } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Success", "You have been logged out.");
      router.replace("/(tabs)/(auth)/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* Welcome Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome, {user?.displayName || "User"}!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      {/* Demo Content (optional, keep or remove) */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Getting Started</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  logoutContainer: {
    marginVertical: 20,
    alignItems: "flex-start",
  },
});
