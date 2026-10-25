import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";

interface ProductRowProps {
  phone: Phone;
  onPress: () => void;
}

export function ProductRow({ phone, onPress }: ProductRowProps) {
  const { has, toggle } = useFavorites();
  const isFav = has(phone.id);
  const colorKey = phone.defaultColor ?? "blue";
  const imageSource = PHONE_COLORS[colorKey]?.image;
  const shortName = phone.name.split(" - ")[0];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {imageSource && (
        <Image source={imageSource} style={styles.thumb} resizeMode="contain" />
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {shortName}
        </Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {phone.supplier}
        </Text>
      </View>
      <Pressable
        style={styles.heartBtn}
        onPress={(e) => {
          e.stopPropagation?.();
          toggle(phone.id);
        }}
      >
        <Ionicons
          name={isFav ? "heart" : "heart-outline"}
          size={24}
          color={isFav ? colors.red : colors.muted}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: {
    width: 60,
    height: 70,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.red,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
  },
  heartBtn: {
    padding: 8,
  },
});
