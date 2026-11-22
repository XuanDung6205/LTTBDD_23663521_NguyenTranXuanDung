import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import BookCard from "../components/BookCard";
import { BOOKS } from "../data/books";
import type { RootStackParamList, TabParamList } from "../navigation";
import { selectFavoriteIds } from "../store/favoritesSlice";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Favorites">,
  NativeStackScreenProps<RootStackParamList>
>;

export function FavoritesScreen({ navigation }: Props) {
  const ids = useAppSelector(selectFavoriteIds);
  const favorites = BOOKS.filter((b) => ids.includes(b.id));

  const onSelect = useCallback(
    (id: string) => {
      navigation.navigate("Detail", { id });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>♥ Yêu thích</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 14, paddingBottom: 30, flexGrow: 1 }}
        renderItem={({ item }) => (
          <BookCard book={item} layout="row" onSelect={onSelect} />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.empty}>Chưa có sách yêu thích nào.</Text>
          </View>
        }
      />
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
  empty: { color: colors.muted, fontSize: 15, textAlign: "center", marginTop: 24 },
});