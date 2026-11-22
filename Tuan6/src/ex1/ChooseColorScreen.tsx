import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  // Lấy màu hiện tại được truyền từ màn hình Product sang (nếu có)
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);

  // Tách tên sản phẩm thành 2 dòng (ví dụ: "Điện Thoại Vsmart Joy 3" và "Hàng chính hãng")
  const [line1, line2] = phone.name.split(" - ");

  // Ảnh thu nhỏ: hiển thị màu đang được chọn (picked), nếu chưa chọn thì lấy màu mặc định
  const currentImage = PHONE_COLORS[picked ?? phone.defaultColor].image;

  return (
    <SafeAreaView style={styles.root}>
      {/* Nửa trên: Nền trắng, gồm ảnh nhỏ bên trái và thông tin bên phải */}
      <View style={styles.header}>
        <Image
          source={currentImage}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{line1}</Text>
          {line2 ? <Text style={styles.title}>{line2}</Text> : null}

          {/* TODO 3: CHỈ KHI đã chọn màu (picked khác undefined) hiện thêm 3 dòng dưới tên sản phẩm:
                     - Màu: <PHONE_COLORS[picked].label>   (tên màu IN ĐẬM)
                     - Cung cấp bởi <phone.supplier>       (nhà cung cấp IN ĐẬM)
                     - <formatPrice(phone.price)>          (giá tiền, chữ đậm)
          */}
          {picked ? (
            <View style={styles.pickedDetails}>
              <Text style={styles.detailText}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detailText}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceBold}>{formatPrice(phone.price)}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Nửa dưới: Nền xám (colors.grey), gồm gợi ý, 4 ô màu xếp dọc và nút XONG */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        {/* Danh sách 4 ô màu (bạc, đỏ, đen, xanh) */}
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => {
            const isSelected = picked === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPicked(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: PHONE_COLORS[key].hex },
                  isSelected && styles.swatchOn,
                ]}
              />
            );
          })}
        </View>

        {/* TODO 4: Nút "XONG"
            - Nền xanh (colors.blue / #1952E1), bo góc, chữ trắng in đậm
            - Bấm → quay trở lại màn hình "Product", gửi kèm màu vừa chọn trong params (merge: true)
        */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => {
            navigation.navigate({
              name: "Product",
              params: { color: picked },
              merge: true,
            });
          }}
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 16,
    alignItems: "center",
  },
  thumb: {
    width: 95,
    height: 125,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    lineHeight: 20,
  },
  pickedDetails: {
    marginTop: 8,
    gap: 6,
  },
  detailText: {
    fontSize: 15,
    color: colors.text,
  },
  bold: {
    fontWeight: "700",
    color: "#000000",
  },
  priceBold: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginTop: 4,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 6,
  },
  swatches: {
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    flex: 1,
  },
  swatch: {
    width: 85,
    height: 80,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    transform: [{ scale: 1.05 }],
  },
  doneBtn: {
    backgroundColor: "#1952E1",
    height: 48,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  doneBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
