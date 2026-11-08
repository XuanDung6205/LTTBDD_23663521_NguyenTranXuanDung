import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// Lấy thêm onChange từ Props[cite: 1]
export function RatingStars({ value, size = 18, onChange }: Props) {
  // Làm tròn điểm để tô màu sao (ví dụ: 4.5 -> 5 sao vàng)
  const filled = Math.round(value);
  
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        // Nếu sao hiện tại nhỏ hơn hoặc bằng điểm làm tròn thì tô màu vàng (warning), ngược lại màu xám (line)[cite: 1]
        const star = (
          <Text key={n} style={{ fontSize: size, color: n <= filled ? colors.warning : colors.line }}>
            ★
          </Text>
        );

        // Nếu có hàm onChange (đang ở form đánh giá), bọc sao trong Pressable để bấm được[cite: 1]
        return onChange ? (
          <Pressable 
            key={n} 
            onPress={() => onChange(n)} 
            hitSlop={4} 
            accessibilityLabel={`${n} sao`}
          >
            {star}
          </Pressable>
        ) : (
          // Nếu không có onChange (chỉ để hiển thị điểm TB), chỉ render Text sao
          star
        );
      })}
    </View>
  );
}

// Thay đổi style.todo thành style.row để sao nằm ngang và bỏ khung cam đứt nét[cite: 1]
const styles = StyleSheet.create({
  row: { 
    flexDirection: "row", 
    gap: 2, 
    alignItems: "center" 
  },
});