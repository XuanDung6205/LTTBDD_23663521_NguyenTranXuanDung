import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";
import { useAuth, useCart } from "../store/hooks";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { validatePhone, validateRequired } from "../utils/validators";
import { createOrder } from "../services/orderService";
import { getErrorMessage } from "../api/client";
import { showMessage } from "../utils/dialog";
import { PaymentMethod } from "../types";

export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { user, isLoggedIn } = useAuth();
  const { items, clear } = useCart();

  // Redirect về Login nếu chưa đăng nhập
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
    }
  }, [isLoggedIn, navigation, route.params?.total]);

  // --- State Form ---
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [touched, setTouched] = useState({ name: false, phone: false, address: false });

  // --- Loading & Lỗi ---
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // --- Giá trị dẫn xuất (Derived state & Validation) ---
  const nameError = useMemo(() => validateRequired("họ tên")(name), [name]);
  const phoneError = useMemo(() => validatePhone(phone), [phone]);
  const addressError = useMemo(() => validateRequired("địa chỉ nhận hàng")(address), [address]);

  const isValid = !nameError && !phoneError && !addressError;

  const totalAmount = route.params?.total ?? 0;

  // --- Xử lý gửi đơn hàng (POST /orders) ---
  const handleSubmitOrder = async () => {
    setTouched({ name: true, phone: true, address: true });
    if (!isValid || !user) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const newOrder = {
        userId: user.id,
        items: items.map((item) => ({
          bookId: item.bookId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalAmount,
        address: {
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
        },
        paymentMethod,
        status: "pending" as const,
        createdAt: new Date().toISOString(),
      };

      const created = await createOrder(newOrder);

      // Xoá giỏ hàng sau khi đặt thành công
      clear();

      showMessage(
        "🎉 Đặt hàng thành công!",
        `Mã đơn hàng của bạn là #${created.id}. Chúng tôi sẽ liên hệ sớm nhất.`,
        () => {
          navigation.replace("Orders");
        }
      );
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn || !user) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Tóm tắt đơn hàng */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📦 Tóm tắt đơn hàng ({items.length} món)</Text>
          <View style={styles.divider} />
          {items.map((item) => (
            <View key={item.bookId} style={styles.orderItemRow}>
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemQty}>
                  {formatPrice(item.price)} × {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemSubtotal}>
                {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
            <Text style={styles.totalValue}>{formatPrice(totalAmount)}</Text>
          </View>
        </View>

        {/* Thông tin nhận hàng (Form) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 Thông tin giao hàng</Text>
          <View style={styles.divider} />

          <FormField
            label="Họ và tên người nhận *"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={name}
            onChangeText={(v) => {
              setName(v);
              if (!touched.name) setTouched((t) => ({ ...t, name: true }));
            }}
            error={touched.name ? nameError : null}
          />

          <FormField
            label="Số điện thoại liên hệ *"
            placeholder="Ví dụ: 0901234567"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(v) => {
              setPhone(v);
              if (!touched.phone) setTouched((t) => ({ ...t, phone: true }));
            }}
            error={touched.phone ? phoneError : null}
          />

          <FormField
            label="Địa chỉ nhận hàng *"
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
            value={address}
            onChangeText={(v) => {
              setAddress(v);
              if (!touched.address) setTouched((t) => ({ ...t, address: true }));
            }}
            error={touched.address ? addressError : null}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💳 Phương thức thanh toán</Text>
          <View style={styles.divider} />

          <Pressable
            style={[styles.methodOption, paymentMethod === "cod" && styles.methodOptionActive]}
            onPress={() => setPaymentMethod("cod")}
          >
            <View style={styles.radioOuter}>
              {paymentMethod === "cod" && <View style={styles.radioInner} />}
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>💵 Thanh toán khi nhận hàng (COD)</Text>
              <Text style={styles.methodSub}>Trả tiền mặt khi người giao hàng đến</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.methodOption, paymentMethod === "bank" && styles.methodOptionActive]}
            onPress={() => setPaymentMethod("bank")}
          >
            <View style={styles.radioOuter}>
              {paymentMethod === "bank" && <View style={styles.radioInner} />}
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>🏦 Chuyển khoản ngân hàng</Text>
              <Text style={styles.methodSub}>Chuyển qua VietQR hoặc số tài khoản ngân hàng</Text>
            </View>
          </Pressable>
        </View>

        {/* Báo lỗi nếu gửi đơn thất bại */}
        {submitError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {submitError}</Text>
          </View>
        )}

        {/* Nút đặt hàng */}
        <View style={styles.btnWrap}>
          <PrimaryButton
            title={`Đặt hàng • ${formatPrice(totalAmount)}`}
            onPress={handleSubmitOrder}
            disabled={!isValid}
            loading={submitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 14, paddingBottom: 40 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: colors.navy },
  divider: { height: 1, backgroundColor: colors.line },
  orderItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  itemEmoji: { fontSize: 24 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: "700", color: colors.text },
  itemQty: { fontSize: 12, color: colors.muted, marginTop: 2 },
  itemSubtotal: { fontSize: 14, fontWeight: "700", color: colors.indigo },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 15, fontWeight: "700", color: colors.text },
  totalValue: { fontSize: 18, fontWeight: "800", color: colors.indigo },
  methodOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: "#fff",
  },
  methodOptionActive: {
    borderColor: colors.indigo,
    backgroundColor: "#EEF2FF",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.indigo,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.indigo,
  },
  methodInfo: { flex: 1 },
  methodLabel: { fontSize: 14, fontWeight: "700", color: colors.text },
  methodSub: { fontSize: 12, color: colors.muted, marginTop: 2 },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: { color: colors.danger, fontSize: 13, fontWeight: "600" },
  btnWrap: { marginTop: 6 },
});