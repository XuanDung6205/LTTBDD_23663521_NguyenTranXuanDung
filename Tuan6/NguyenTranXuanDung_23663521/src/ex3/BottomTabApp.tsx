import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { fetchPhones } from "../api/phoneApi";
import { PHONE_COLORS } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Tên icon tương ứng: [khi tab đang chọn (đặc), khi không chọn (viền)]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// ==================== TAB 1: TRANG CHỦ (HomeTab) ====================
function HomeTab() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhones()
      .then((data) => setPhones(data))
      .catch((err) => console.error("Lỗi lấy danh sách sản phẩm:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.red} />
        <Text style={styles.mutedText}>Đang tải sản phẩm từ MockAPI...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={phones}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => {
          const shortName = item.name.split(" - ")[0];
          const colorKey = item.defaultColor ?? "blue";
          const phoneImg = PHONE_COLORS[colorKey]?.image;

          return (
            <View style={styles.card}>
              {phoneImg && (
                <Image source={phoneImg} style={styles.cardThumb} resizeMode="contain" />
              )}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{shortName}</Text>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
                <Text style={styles.cardSupplier}>Cung cấp bởi: {item.supplier}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

// ==================== TAB 2: TÌM KIẾM (SearchTab - TODO 1) ====================
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhones()
      .then((data) => setPhones(data))
      .catch((err) => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  }, []);

  // Lọc sản phẩm theo keyword (không phân biệt hoa thường)
  const filteredPhones = phones.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Ô nhập từ khóa tìm kiếm */}
      <View style={styles.searchBarWrap}>
        <Ionicons name="search" size={20} color={colors.muted} style={{ marginRight: 8 }} />
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Nhập từ khóa tìm kiếm (vd: joy, aris, live...)"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
        {keyword.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.muted}
            onPress={() => setKeyword("")}
          />
        )}
      </View>

      {/* Hiển thị danh sách kết quả hoặc thông báo không tìm thấy */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.red} />
        </View>
      ) : filteredPhones.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.muted} />
          <Text style={styles.noResultText}>
            Không có kết quả cho "{keyword}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPhones}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => {
            const shortName = item.name.split(" - ")[0];
            const colorKey = item.defaultColor ?? "blue";
            const phoneImg = PHONE_COLORS[colorKey]?.image;

            return (
              <View style={styles.card}>
                {phoneImg && (
                  <Image source={phoneImg} style={styles.cardThumb} resizeMode="contain" />
                )}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{shortName}</Text>
                  <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
                  <Text style={styles.cardSupplier}>{item.supplier}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

// ==================== TAB 3: CÁ NHÂN (ProfileTab - TODO 2) ====================
function ProfileTab() {
  return (
    <View style={styles.profileContainer}>
      {/* Vòng tròn Avatar bo tròn width=height=96, borderRadius=48 */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>Đ</Text>
      </View>

      {/* Tên chữ lớn, in đậm */}
      <Text style={styles.profileName}>Xuân Dũng</Text>

      {/* Dòng email */}
      <Text style={styles.profileEmail}>Xuandung6205@gmail.com</Text>

      <View style={styles.badgeProfile}>
        <Text style={styles.badgeProfileText}>Thành viên VIP</Text>
      </View>
    </View>
  );
}

// ==================== MAIN BOTTOM TAB NAVIGATOR (TODO 3) ====================
export function BottomTabApp() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "700", fontSize: 17 },
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = ICONS[route.name][focused ? 0 : 1];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  mutedText: {
    fontSize: 14,
    color: colors.muted,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardThumb: {
    width: 65,
    height: 75,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.red,
  },
  cardSupplier: {
    fontSize: 12,
    color: colors.muted,
  },
  searchBarWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  noResultText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "center",
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 38,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  profileEmail: {
    fontSize: 15,
    color: colors.muted,
  },
  badgeProfile: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#FFF2F2",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFD0D0",
  },
  badgeProfileText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: "600",
  },
});
