import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";
import { useEffect } from 'react';
import { useCart, useAuth } from "../store/hooks";

// KHUNG TỐI GIẢN: form địa chỉ + đặt hàng làm ở buổi sau.
// TODO BT8.4 (lớp bảo vệ thứ 2): dùng useAuth() → isLoggedIn; trong useEffect, nếu chưa đăng nhập thì
//   navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total }); chưa đăng nhập thì return null.
export function CheckoutScreen({ route, navigation }: RootScreenProps<"Checkout">) {
  // 1. Lấy trạng thái đăng nhập từ store
  const { isLoggedIn } = useAuth();

  // 2. Chuyển hướng nếu lọt vào màn này mà chưa đăng nhập
  useEffect(() => {
    if (!isLoggedIn) {
      // Dùng replace để thay thế màn hình hiện tại, tránh lỗi nút Back
      navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
    }
  }, [isLoggedIn, navigation, route.params.total]);

  // 3. Trả về null (không render giao diện) nếu chưa đăng nhập
  if (!isLoggedIn) return null;
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(route.params.total)}</Text>
      <Text style={styles.note}>(Form địa chỉ & thanh toán sẽ làm ở buổi sau)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg, gap: 8 },
  label: { color: colors.muted, fontSize: 15 },
  total: { fontSize: 32, fontWeight: "800", color: colors.indigo },
  note: { color: colors.muted, marginTop: 12 },
});
