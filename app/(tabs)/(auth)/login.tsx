import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, resetPassword } = useAuth(); // Added resetPassword
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset password");
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert(
        "Check your email",
        "A password reset link has been sent to your email."
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Welcome Back
        </ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.text, color: colors.text },
            ]}
            placeholder="Email"
            placeholderTextColor={colors.text + "80"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={[
              styles.input,
              { borderColor: colors.text, color: colors.text },
            ]}
            placeholder="Password"
            placeholderTextColor={colors.text + "80"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <ThemedText style={[styles.buttonText, { color: "black" }]}>
              Sign In
            </ThemedText>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleForgotPassword}
          disabled={loading}
          style={{ marginBottom: 16 }}
        >
          <ThemedText style={{ color: colors.tint, textAlign: "center" }}>
            Forgot Password?
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <ThemedText style={styles.linkText}>
            Don&apos;t have an account?{" "}
          </ThemedText>
          <Link href="/signup" style={[styles.link, { color: colors.tint }]}>
            <ThemedText style={[styles.link, { color: colors.tint }]}>
              Sign Up
            </ThemedText>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    opacity: 0.7,
  },
  link: {
    fontWeight: "600",
  },
});
