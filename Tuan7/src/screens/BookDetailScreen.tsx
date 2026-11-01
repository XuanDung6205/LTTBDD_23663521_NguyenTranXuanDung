import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

// gọi getBookById thay cho mảng tĩnh; có loading + lỗi + thử lại
export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { isFavorite, toggle } = useWishlist();
  const favorite = isFavorite(bookId);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Giả lập độ trễ mạng để quan sát rõ màn hình Loading
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingView label="Đang tải chi tiết sách…" />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>

      <View style={styles.actionRow}>
        <Pressable
          style={styles.btn}
          onPress={() =>
            add({
              bookId: book.id,
              title: book.title,
              price: book.price,
              emoji: book.emoji,
              color: book.color,
              stock: book.stock,
            })
          }
        >
          <Text style={styles.btnText}>Thêm vào giỏ</Text>
        </Pressable>

        <Pressable
          style={[styles.heartBtn, favorite && styles.heartBtnActive]}
          onPress={() => toggle(book.id)}
        >
          <Text style={[styles.heartText, favorite && styles.heartTextActive]}>
            {favorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8 },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginTop: 4 },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 },
  btn: { flex: 1, backgroundColor: colors.indigo, padding: 14, borderRadius: radius.md, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  heartBtn: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  heartBtnActive: {
    borderColor: colors.heart,
    backgroundColor: "#FEE2E2",
  },
  heartText: {
    fontSize: 26,
    color: colors.muted,
  },
  heartTextActive: {
    color: colors.heart,
  },
});
