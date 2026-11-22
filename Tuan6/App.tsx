import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

export default function App() {
  // Mặc định mở Bài 5 (Drawer Navigation)
  const [activeTab, setActiveTab] = useState<"ex1_2" | "ex3" | "ex4" | "ex5">("ex5");

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar style="dark" />

        {/* Thanh chuyển đổi chọn bài từ 1 đến 5 (100% MockAPI) */}
        <View style={styles.menuBarContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menuBar}
          >
            <Pressable
              style={[styles.tabBtn, activeTab === "ex1_2" && styles.tabBtnActive]}
              onPress={() => setActiveTab("ex1_2")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "ex1_2" && styles.tabTextActive,
                ]}
              >
                Bài 1+2 (API)
              </Text>
            </Pressable>

            <Pressable
              style={[styles.tabBtn, activeTab === "ex3" && styles.tabBtnActive]}
              onPress={() => setActiveTab("ex3")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "ex3" && styles.tabTextActive,
                ]}
              >
                Bài 3 (Bottom Tab)
              </Text>
            </Pressable>

            <Pressable
              style={[styles.tabBtn, activeTab === "ex4" && styles.tabBtnActive]}
              onPress={() => setActiveTab("ex4")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "ex4" && styles.tabTextActive,
                ]}
              >
                Bài 4 (Stack + Tab)
              </Text>
            </Pressable>

            <Pressable
              style={[styles.tabBtn, activeTab === "ex5" && styles.tabBtnActive]}
              onPress={() => setActiveTab("ex5")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "ex5" && styles.tabTextActive,
                ]}
              >
                Bài 5 (Drawer)
              </Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Nội dung bài tập */}
        <View style={styles.content}>
          {activeTab === "ex1_2" && <SelectPhoneApi />}
          {activeTab === "ex3" && <BottomTabApp />}
          {activeTab === "ex4" && <StackTabApp />}
          {activeTab === "ex5" && <DrawerApp />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  menuBarContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  menuBar: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#F4F5F7",
  },
  tabBtnActive: {
    backgroundColor: colors.red,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
});
