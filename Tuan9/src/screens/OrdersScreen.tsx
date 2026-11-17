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
import { Order, OrderStatus } from "../types";
import { getOrders } from "../services/orderService";
import { getErrorMessage } from "../api/client";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { EmptyState } from "../components/EmptyState";
import { colors, formatPrice, radius } from "../theme";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; icon: string }
> = {
  pending: { label: "Chờ xác nhận", bg: "#FEF3C7", text: "#D97706", icon: "⏳" },
  shipping: { label: "Đang giao", bg: "#DBEAFE", text: "#2563EB", icon: "🚚" },
  completed: { label: "Đã hoàn tất", bg: "#DCFCE7", text: "#16A34A", icon: "✅" },
  cancelled: { label: "Đã hủy", bg: "#FEE2E2", text: "#DC2626", icon: "✕" },
};

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lưu danh sách id của các đơn hàng đang mở rộng (expanded)
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const loadOrders = useCallback(async () => {
    if (!user) return;
    setError(null);
    try {
      const data = await getOrders(user.id);
      setOrders(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const onRefresh = () => {
    setRefreshing(true);
    loadOrders();
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()} ${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    } catch {
      return isoString;
    }
  };

  if (loading) {
    return <LoadingView label="Đang tải đơn hàng..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadOrders} />;
  }

  const renderOrderItem = ({ item }: { item: Order }) => {
    const isExpanded = expandedIds.includes(item.id);
    const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
    const totalItems = item.items.reduce((sum, i) => sum + i.quantity, 0);

    return (
      <View style={styles.card}>
        {/* Header thẻ đơn hàng */}
        <Pressable
          style={styles.cardHeader}
          onPress={() => toggleExpand(item.id)}
          accessibilityRole="button"
        >
          <View style={styles.headerTop}>
            <Text style={styles.orderId}>Đơn hàng #{item.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={[styles.statusText, { color: status.text }]}>
                {status.icon} {status.label}
              </Text>
            </View>
          </View>

          <Text style={styles.orderDate}>🕒 {formatDate(item.createdAt)}</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.itemsSummary}>{totalItems} sản phẩm</Text>
            <Text style={styles.orderTotal}>{formatPrice(item.total)}</Text>
          </View>

          <View style={styles.expandToggle}>
            <Text style={styles.expandText}>
              {isExpanded ? "Thu gọn ▲" : "Xem chi tiết ▼"}
            </Text>
          </View>
        </Pressable>

        {/* Nội dung mở rộng chi tiết (Expandable section) */}
        {isExpanded && (
          <View style={styles.cardDetails}>
            <View style={styles.divider} />

            {/* Danh sách sách trong đơn */}
            <Text style={styles.sectionHeading}>📚 Chi tiết sản phẩm</Text>
            {item.items.map((prod, idx) => (
              <View key={`${item.id}-${prod.bookId}-${idx}`} style={styles.productRow}>
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {prod.title}
                  </Text>
                  <Text style={styles.productPriceQty}>
                    {formatPrice(prod.price)} × {prod.quantity}
                  </Text>
                </View>
                <Text style={styles.productSubtotal}>
                  {formatPrice(prod.price * prod.quantity)}
                </Text>
              </View>
            ))}

            <View style={styles.divider} />

            {/* Thông tin người nhận và thanh toán */}
            <Text style={styles.sectionHeading}>📍 Thông tin giao nhận</Text>
            <Text style={styles.infoLine}>
              <Text style={styles.infoBold}>Người nhận: </Text>
              {item.address.name} ({item.address.phone})
            </Text>
            <Text style={styles.infoLine}>
              <Text style={styles.infoBold}>Địa chỉ: </Text>
              {item.address.address}
            </Text>
            <Text style={styles.infoLine}>
              <Text style={styles.infoBold}>Thanh toán: </Text>
              {item.paymentMethod === "cod"
                ? "Thanh toán khi nhận hàng (COD)"
                : "Chuyển khoản ngân hàng"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderOrderItem}
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
            emoji="📦"
            title="Chưa có đơn hàng nào"
            message="Bạn chưa đặt đơn hàng nào trên BookStore. Hãy chọn những cuốn sách yêu thích ngay nhé!"
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  listContent: { padding: 14, gap: 12, paddingBottom: 30 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 14,
    gap: 6,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: { fontSize: 16, fontWeight: "800", color: colors.navy },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
  orderDate: { fontSize: 12, color: colors.muted },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  itemsSummary: { fontSize: 14, color: colors.text, fontWeight: "500" },
  orderTotal: { fontSize: 16, fontWeight: "800", color: colors.indigo },
  expandToggle: {
    alignItems: "center",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  expandText: { fontSize: 12, fontWeight: "700", color: colors.indigo },
  cardDetails: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    backgroundColor: "#FAFBFD",
    gap: 8,
  },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 4 },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.navy,
    marginBottom: 2,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
  },
  productInfo: { flex: 1, paddingRight: 8 },
  productTitle: { fontSize: 13, color: colors.text, fontWeight: "600" },
  productPriceQty: { fontSize: 12, color: colors.muted, marginTop: 1 },
  productSubtotal: { fontSize: 13, fontWeight: "700", color: colors.text },
  infoLine: { fontSize: 13, color: colors.text, lineHeight: 18 },
  infoBold: { fontWeight: "700", color: colors.navy },
});
