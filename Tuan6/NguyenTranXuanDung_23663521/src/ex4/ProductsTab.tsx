import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import { TabProps } from "./types";
import { fetchPhones } from "../api/phoneApi";
import { Phone } from "../types";
import { colors } from "../theme";
import { ProductRow } from "./ProductRow";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhones()
      .then((data) => setPhones(data))
      .catch((err) => console.error("Lỗi tải danh sách sản phẩm:", err))
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

  // TODO 3: FlatList data={phones}; mỗi dòng là <ProductRow phone={item} onPress={...} />
  // onPress: navigation.navigate("ProductDetails", { id: item.id })
  return (
    <View style={styles.container}>
      <FlatList
        data={phones}
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
    gap: 10,
    backgroundColor: "#F4F5F7",
  },
  mutedText: {
    fontSize: 14,
    color: colors.muted,
  },
});
