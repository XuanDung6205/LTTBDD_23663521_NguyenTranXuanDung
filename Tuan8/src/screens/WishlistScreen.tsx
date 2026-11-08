import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useWishlist } from '../store/hooks';
import { Book } from '../types';
import { getBooks } from '../services/bookService';
// import { getErrorMessage } from '../utils/error';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { BookGrid } from '../components/BookGrid';
import { EmptyState } from '../components/EmptyState';
import { RootScreenProps } from '../navigation/types';
import { colors } from '../theme';

export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  // 1. Lấy danh sách ID sách yêu thích từ store
  const { ids } = useWishlist();
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Hàm gọi API lấy toàn bộ danh sách sách
  const load = useCallback(async () => {
    setLoading(true); 
    setError(null);
    try { 
      setBooks(await getBooks()); 
    } catch (e) { 
      // setError(getErrorMessage(e)); 
    } finally { 
      setLoading(false); 
    }
  }, []);

  useEffect(() => { 
    load(); 
  }, [load]);

  // 3. Lọc ra các sách có ID nằm trong danh sách yêu thích
  const favorites = useMemo(() => books.filter((b) => ids.includes(b.id)), [books, ids]);

  // 4. Xử lý các trạng thái màn hình
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <BookGrid 
        data={favorites} 
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListEmptyComponent={
          <EmptyState 
            emoji="💔" 
            title="Chưa có sách yêu thích" 
            message="Nhấn ♡ trên mỗi cuốn sách để lưu lại ở đây."
            actionLabel="Khám phá sách" 
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })} 
          />
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg }
});