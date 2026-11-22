import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
import { getBookById } from "../data/books";
import { formatPrice } from "../utils";
import { colors } from "../theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { selectIsFavorite, toggleFavorite } from "../store/favoritesSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export function DetailScreen({ route }: Props) {
  const { id } = route.params;
  const book = getBookById(id);
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(selectIsFavorite(id));

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Không tìm thấy thông tin sách.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.coverBox}>
        <Image
          source={{ uri: book.cover }}
          style={styles.cover}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.sub}>
        {book.author} · {book.category}
      </Text>
      <Text style={styles.rating}>⭐ {book.rating.toFixed(1)} / 10</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
        <Text style={[styles.stock, !book.inStock && styles.outStock]}>
          {book.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
        </Text>
      </View>

      <Text style={styles.desc}>{book.description}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btnPrimary, !book.inStock && styles.btnDisabled]}
          disabled={!book.inStock}
          onPress={() => dispatch(addToCart(book))}
          testID="add-cart"
        >
          <Text style={styles.btnPrimaryText}>Thêm vào giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnFav, favorite && styles.btnFavOn]}
          onPress={() => dispatch(toggleFavorite(book.id))}
          testID="toggle-fav"
        >
          <Text style={[styles.btnFavText, favorite && styles.btnFavTextOn]}>
            {favorite ? "♥ Đã yêu thích" : "♡ Yêu thích"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  muted: { color: colors.muted, fontSize: 15 },
  container: { padding: 16, gap: 10, backgroundColor: colors.bg, flexGrow: 1 },
  coverBox: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.indigo,
  },
  cover: { width: "100%", height: "100%" },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 4 },
  sub: { fontSize: 14, color: colors.muted },
  rating: { fontSize: 14, fontWeight: "600", color: colors.text },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { fontSize: 14, fontWeight: "700", color: "#15803D" },
  outStock: { color: "#B42318" },
  desc: { fontSize: 14, lineHeight: 20, color: colors.text, marginTop: 4 },
  actions: { flexDirection: "row", gap: 10, marginTop: 12 },
  btnPrimary: {
    flex: 1,
    backgroundColor: colors.indigo,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.45 },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnFav: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.indigo,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnFavOn: { backgroundColor: "#DC2626", borderColor: "#DC2626" },
  btnFavText: { color: colors.indigo, fontWeight: "700", fontSize: 15 },
  btnFavTextOn: { color: "#fff" },
});