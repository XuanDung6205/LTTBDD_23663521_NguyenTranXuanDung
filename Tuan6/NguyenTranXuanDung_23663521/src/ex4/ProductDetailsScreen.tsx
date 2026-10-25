import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootProps } from "./types";
import { fetchPhone } from "../api/phoneApi";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: Lấy id từ params
  const { id } = route.params;

  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook quản lý trạng thái yêu thích
  const { has, toggle } = useFavorites();

  useEffect(() => {
    fetchPhone(id)
      .then((data) => setPhone(data))
      .catch((err) => setError(err.message || "Không thể tải sản phẩm"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.red} />
        <Text style={styles.loadingText}>Đang tải chi tiết sản phẩm...</Text>
      </View>
    );
  }

  // TODO 5: Không tìm thấy sản phẩm
  if (error || !phone) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={54} color={colors.red} />
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFavorited = has(phone.id);
  const colorKey = phone.defaultColor ?? "blue";
  const imageSource = PHONE_COLORS[colorKey]?.image;

  // TODO 6: Hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp
  // TODO 7: Nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" -> toggle(phone.id)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Khối ảnh sản phẩm lớn */}
      <View style={styles.imageWrap}>
        {imageSource && (
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
        )}
      </View>

      {/* Khối thông tin chi tiết */}
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.label}>Nhà cung cấp:</Text>
          <Text style={styles.value}>{phone.supplier}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Màu mặc định:</Text>
          <Text style={styles.value}>{PHONE_COLORS[colorKey]?.label.toUpperCase()}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Cam kết:</Text>
          <Text style={styles.badge}>{phone.badge}</Text>
        </View>
      </View>

      {/* TODO 7: Nút lưu vào yêu thích */}
      <Pressable
        style={[styles.favBtn, isFavorited && styles.favBtnActive]}
        onPress={() => toggle(phone.id)}
      >
        <Ionicons
          name={isFavorited ? "heart" : "heart-outline"}
          size={20}
          color={isFavorited ? "#FFFFFF" : colors.red}
        />
        <Text style={[styles.favBtnText, isFavorited && styles.favBtnTextActive]}>
          {isFavorited ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.muted,
  },
  notFoundText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 280,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  review: {
    fontSize: 14,
    color: colors.muted,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: colors.muted,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.red,
  },
  favBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.red,
    backgroundColor: "#FFF5F5",
    marginTop: 10,
  },
  favBtnActive: {
    backgroundColor: colors.red,
  },
  favBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.red,
  },
  favBtnTextActive: {
    color: "#FFFFFF",
  },
});
