import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabProps } from "./types";
import { fetchPhones } from "../api/phoneApi";
import { Phone } from "../types";
import { colors } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductRow";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhones()
      .then((data) => setPhones(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  // TODO 8: Lọc các sản phẩm có id nằm trong danh sách ids yêu thích
  const favoritePhones = phones.filter((p) => ids.includes(p.id));

  // Nếu danh sách rỗng -> hiển thị "Chưa có sản phẩm nào được lưu."
  if (favoritePhones.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-dislike-outline" size={54} color={colors.muted} />
        <Text style={styles.emptyTitle}>Chưa có sản phẩm nào được lưu</Text>
        <Text style={styles.emptySubtitle}>
          Hãy bấm vào biểu tượng trái tim để lưu lại sản phẩm bạn yêu thích!
        </Text>
      </View>
    );
  }

  // Bấm một dòng cũng mở ProductDetails như Tab1
  return (
    <View style={styles.container}>
      <FlatList
        data={favoritePhones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <ProductRow
            phone={item}
            onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
          />
        )}
      />
    </View>
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
    backgroundColor: "#F4F5F7",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});
