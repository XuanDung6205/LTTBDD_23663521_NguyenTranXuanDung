import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToCart,
  clearCart,
  decrease,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Giỏ hàng</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>Giỏ hàng trống.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.bookId}
            contentContainerStyle={{ padding: 14, gap: 10 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{formatPrice(item.price)}</Text>
                </View>

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => dispatch(decrease(item.bookId))}
                    testID={`dec-${item.bookId}`}
                  >
                    <Text style={styles.qtyText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyVal}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                      dispatch(
                        addToCart({
                          id: item.bookId,
                          title: item.title,
                          price: item.price,
                        })
                      )
                    }
                    testID={`inc-${item.bookId}`}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Tổng cộng: {formatPrice(total)}</Text>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => dispatch(clearCart())}
            >
              <Text style={styles.clearText}>Xoá giỏ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.navy,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: colors.muted, fontSize: 15 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 10,
  },
  title: { fontSize: 15, fontWeight: "700", color: colors.text },
  price: { fontSize: 14, fontWeight: "700", color: colors.indigo },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  qtyText: { fontSize: 16, fontWeight: "800", color: colors.text },
  qtyVal: { fontSize: 15, fontWeight: "700", minWidth: 18, textAlign: "center" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  total: { fontSize: 16, fontWeight: "800", color: colors.text },
  clearBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DC2626",
  },
  clearText: { color: "#DC2626", fontWeight: "700" },
});