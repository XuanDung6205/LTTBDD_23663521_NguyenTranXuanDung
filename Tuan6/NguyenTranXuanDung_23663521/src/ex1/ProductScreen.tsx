import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  // Lấy màu được truyền về từ params (nếu người dùng đã chọn),
  // nếu chưa chọn thì hiển thị màu mặc định (phone.defaultColor = "blue")
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  const handleBuy = () => {
    Alert.alert(
      "Thông báo",
      `Bạn đã chọn mua: ${phone.name}\nMàu sắc: ${PHONE_COLORS[shown].label.toUpperCase()}\nGiá: ${formatPrice(phone.price)}`
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Khối hiển thị ảnh sản phẩm */}
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Khối thông tin sản phẩm */}
      <View style={styles.info}>
        {/* Tên sản phẩm */}
        <Text style={styles.name}>{phone.name}</Text>

        {/* Đánh giá sao và số lượt đánh giá */}
        <View style={styles.row}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        {/* Giá hiện tại và giá cũ */}
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        {/* Badge cam kết hoàn tiền kèm biểu tượng trợ giúp '?' */}
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.helpIconWrap}>
            <Text style={styles.helpIcon}>?</Text>
          </View>
        </View>

        {/* TODO 1: Nút chọn màu / chọn loại
            - Nút viền xám, bo góc 6
            - Nếu chưa chọn màu (Screen 01) -> hiện chữ: "4 MÀU-CHỌN MÀU"
            - Nếu đã chọn màu (Screen 04)  -> hiện chữ: "4 MÀU-CHỌN LOẠI"
            - Dấu ">" nằm sát lề phải (position: "absolute", right: 12)
            - Bấm nút → chuyển sang màn ChooseColor, truyền màu hiện tại qua params
        */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>›</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút "CHỌN MUA"
          - Nền colors.red, bo góc 6, chữ trắng in đậm canh giữa
          - Nằm SÁT ĐÁY màn hình (đặt ngoài khối info, ở cuối SafeAreaView)
      */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.buyBtn} onPress={handleBuy}>
          <Text style={styles.buyBtnText}>CHỌN MUA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  imageWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 330,
  },
  info: {
    gap: 10,
    paddingBottom: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  review: {
    fontSize: 14,
    color: colors.muted,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  oldPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.red,
  },
  helpIconWrap: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  helpIcon: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.muted,
    lineHeight: 12,
  },
  chooseBtn: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.grey,
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  chooseBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: 0.5,
  },
  arrowIcon: {
    position: "absolute",
    right: 14,
    fontSize: 26,
    color: colors.text,
    lineHeight: 28,
  },
  bottomBar: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  buyBtn: {
    backgroundColor: colors.red,
    height: 48,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
