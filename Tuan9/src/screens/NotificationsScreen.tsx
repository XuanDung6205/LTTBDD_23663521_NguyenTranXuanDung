import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { AppNotification } from "../types";
import { getNotifications, markNotificationAsRead } from "../services/notificationService";
import { getErrorMessage } from "../api/client";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { EmptyState } from "../components/EmptyState";
import { showMessage } from "../utils/dialog";
import { colors, radius } from "../theme";

export function NotificationsScreen({ navigation }: RootScreenProps<"Notifications">) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    if (!user) return;
    setError(null);
    try {
      const data = await getNotifications(user.id);
      setNotifications(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  // Cập nhật lạc quan và điều hướng theo dữ liệu (Data-driven navigation)
  const handlePressNotification = async (item: AppNotification) => {
    // 1. Cập nhật lạc quan (Optimistic Update)
    if (!item.read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
      );

      // Gửi PATCH ngầm lên server
      markNotificationAsRead(item.id).catch((err) => {
        console.warn("Lỗi cập nhật trạng thái thông báo:", err);
      });
    }

    // 2. Điều hướng theo dữ liệu (target)
    if (item.target) {
      if (item.target.screen === "Orders") {
        navigation.navigate("Orders");
        return;
      }
      if (item.target.screen === "BookDetail" && item.target.bookId) {
        navigation.navigate("BookDetail", { bookId: item.target.bookId });
        return;
      }
    }

    // Nếu không có target điều hướng cụ thể, hiện thông báo chi tiết
    showMessage(item.title, item.body);
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    } catch {
      return iso;
    }
  };

  if (loading) {
    return <LoadingView label="Đang tải thông báo..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadNotifications} />;
  }

  const renderItem = ({ item }: { item: AppNotification }) => {
    return (
      <Pressable
        style={[styles.card, !item.read && styles.cardUnread]}
        onPress={() => handlePressNotification(item)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleWrap}>
            {!item.read && <View style={styles.unreadDot} />}
            <Text style={[styles.title, !item.read && styles.titleBold]}>{item.title}</Text>
          </View>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        </View>

        <Text style={styles.body}>{item.body}</Text>

        {item.target && (
          <View style={styles.targetHint}>
            <Text style={styles.targetText}>
              {item.target.screen === "Orders"
                ? "👉 Nhấn để xem đơn hàng"
                : "👉 Nhấn để xem sách"}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.indigo]}
            tintColor={colors.indigo}
          />
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🔔"
            title="Chưa có thông báo nào"
            message="Các tin tức khuyến mãi và cập nhật đơn hàng sẽ xuất hiện tại đây."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  listContent: { padding: 14, gap: 10, paddingBottom: 30 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardUnread: {
    backgroundColor: "#F0F4FF",
    borderColor: "#C7D2FE",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    paddingRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.indigo,
  },
  title: { fontSize: 15, color: colors.text },
  titleBold: { fontWeight: "800", color: colors.navy },
  date: { fontSize: 11, color: colors.muted },
  body: { fontSize: 13, color: colors.text, lineHeight: 18 },
  targetHint: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(59, 63, 216, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginTop: 2,
  },
  targetText: { fontSize: 11, fontWeight: "700", color: colors.indigo },
});
