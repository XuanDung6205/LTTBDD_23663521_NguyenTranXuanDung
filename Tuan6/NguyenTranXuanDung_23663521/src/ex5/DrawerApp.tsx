import React from "react";
import { View, Text, Switch, StyleSheet, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { SettingsProvider, useSettings } from "./SettingsContext";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Tên icon cho từng màn hình
const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// ==================== MÀN HÌNH 1: HOME ====================
function HomeScreen({
  navigation,
}: {
  navigation: DrawerNavigationProp<DrawerParamList, "Home">;
}) {
  const { theme, dark, notify } = useSettings();

  return (
    <View style={[styles.center, { backgroundColor: theme.bg }]}>
      <Text style={[styles.big, { color: theme.text }]}>Xin chào 👋</Text>
      <Text style={[styles.sub, { color: theme.muted }]}>
        Chào mừng bạn đến với ứng dụng Bài 5 (Drawer Navigation)
      </Text>

      <View style={[styles.statusBox, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.statusText, { color: theme.text }]}>
          Trạng thái: Thông báo <Text style={{ fontWeight: "700", color: colors.red }}>{notify ? "BẬT" : "TẮT"}</Text> · Giao diện{" "}
          <Text style={{ fontWeight: "700", color: colors.red }}>{dark ? "Tối" : "Sáng"}</Text>
        </Text>
      </View>

      <Pressable style={styles.openBtn} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={20} color="#FFFFFF" />
        <Text style={styles.openBtnText}>Mở Menu (Drawer)</Text>
      </Pressable>
    </View>
  );
}

// ==================== MÀN HÌNH 2: PROFILE ====================
function ProfileScreen() {
  const { theme } = useSettings();

  return (
    <View style={[styles.center, { backgroundColor: theme.bg }]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>Đ</Text>
      </View>
      <Text style={[styles.big, { color: theme.text }]}>Xuân Dũng</Text>
      <Text style={[styles.muted, { color: theme.muted }]}>Xuandung6205@gmail.com</Text>

      <View style={[styles.infoCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.muted }]}>Mã sinh viên:</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>23663521</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: theme.muted }]}>Môn học:</Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>Thực hành React Native</Text>
        </View>
      </View>
    </View>
  );
}

// ==================== MÀN HÌNH 3: SETTINGS (TODO 1) ====================
function SettingsScreen() {
  // TODO 1 & TODO 3: Sử dụng notify và dark từ Context
  const { notify, setNotify, dark, setDark, theme } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.settingsCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        {/* Dòng 1: Nhận thông báo */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={22} color={colors.red} />
            <Text style={[styles.rowText, { color: theme.text }]}>Nhận thông báo</Text>
          </View>
          <Switch
            value={notify}
            onValueChange={setNotify}
            trackColor={{ false: "#D1D5DB", true: colors.red }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Dòng 2: Giao diện tối */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={22} color={colors.red} />
            <Text style={[styles.rowText, { color: theme.text }]}>Giao diện tối</Text>
          </View>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ false: "#D1D5DB", true: colors.red }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Dòng cuối hiển thị: "Thông báo: BẬT/TẮT · Giao diện: tối/sáng" */}
      <View style={[styles.summaryBox, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
        <Text style={[styles.summaryText, { color: theme.text }]}>
          Thông báo: <Text style={styles.boldRed}>{notify ? "BẬT" : "TẮT"}</Text> · Giao diện:{" "}
          <Text style={styles.boldRed}>{dark ? "tối" : "sáng"}</Text>
        </Text>
      </View>
    </View>
  );
}

// ==================== MAIN DRAWER NAVIGATOR (TODO 2) ====================
function DrawerNavigation() {
  const { theme } = useSettings();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: theme.cardBg },
        headerTintColor: theme.text,
        drawerActiveTintColor: colors.red,
        drawerInactiveTintColor: theme.muted,
        drawerStyle: {
          backgroundColor: theme.cardBg,
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },
        drawerIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Hồ sơ cá nhân" }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Cài đặt" }}
      />
    </Drawer.Navigator>
  );
}

// TODO 2: export function DrawerApp()
export function DrawerApp() {
  return (
    <SettingsProvider>
      <NavigationContainer independent={true}>
        <DrawerNavigation />
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  big: {
    fontSize: 26,
    fontWeight: "700",
  },
  sub: {
    fontSize: 14,
    textAlign: "center",
  },
  muted: {
    fontSize: 15,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  infoCard: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    marginTop: 16,
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  openBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.red,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    elevation: 2,
  },
  openBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  settingsCard: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowText: {
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    height: 1,
  },
  summaryBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 15,
    fontWeight: "500",
  },
  boldRed: {
    fontWeight: "700",
    color: colors.red,
  },
});
