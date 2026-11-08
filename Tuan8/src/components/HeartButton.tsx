import React from 'react';
import { Pressable, Text } from 'react-native';
import { useWishlist } from '../store/hooks';
import { colors } from '../theme';

interface Props { 
  bookId: number; 
  size?: number; 
  style?: any; 
}

export function HeartButton({ bookId, size = 34, style }: Props) {
  // 1. Lấy trạng thái và hàm toggle từ store dùng chung
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);

  return (
    <Pressable 
      style={style} 
      onPress={() => toggle(bookId)} 
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      hitSlop={8}
    >
      {/* 2. Hiển thị tim đỏ hoặc tim rỗng tùy theo trạng thái fav */}
      <Text style={{ fontSize: size, color: fav ? colors.heart : colors.muted }}>
        {fav ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
}