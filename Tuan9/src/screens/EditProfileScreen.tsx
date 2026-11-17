import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { updateProfile } from "../services/userService";
import { validatePhone, validateRequired } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { showMessage } from "../utils/dialog";
import { colors, radius } from "../theme";

export function EditProfileScreen({ navigation }: RootScreenProps<"EditProfile">) {
  const { user, patchUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [touched, setTouched] = useState({ name: false, phone: false });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation
  const nameError = useMemo(() => validateRequired("họ tên")(name), [name]);
  const phoneError = useMemo(() => {
    if (!phone) return null; // Cho phép để trống nếu chưa cập nhật, hoặc nếu bắt buộc thì kiểm tra
    return validatePhone(phone);
  }, [phone]);

  const isValid = !nameError && !phoneError;
  const hasChanged = name.trim() !== (user?.name || "") || phone.trim() !== (user?.phone || "");

  const handleSave = async () => {
    setTouched({ name: true, phone: true });
    if (!isValid || !user) return;

    setSaving(true);
    setError(null);

    try {
      const updateData = {
        name: name.trim(),
        phone: phone.trim(),
      };

      // 1. Gửi PATCH lên server json-server
      const updatedUser = await updateProfile(user.id, updateData);

      // 2. Cập nhật lại Redux Store ngay sau khi lưu
      patchUser({
        name: updatedUser.name,
        phone: updatedUser.phone,
      });

      showMessage("Thành công", "Hồ sơ của bạn đã được cập nhật thành công!", () => {
        navigation.goBack();
      });
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Avatar & Tên đại diện */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.userTitle}>{user.name}</Text>
          <Text style={styles.userSubtitle}>{user.email}</Text>
        </View>

        {/* Form chỉnh sửa thông tin */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>✏️ Thông tin cá nhân</Text>
          <View style={styles.divider} />

          <FormField
            label="Họ và tên *"
            value={name}
            onChangeText={(v) => {
              setName(v);
              if (!touched.name) setTouched((t) => ({ ...t, name: true }));
            }}
            placeholder="Nhập họ và tên..."
            error={touched.name ? nameError : null}
          />

          <FormField
            label="Email đăng nhập (cố định)"
            value={user.email}
            editable={false}
            style={styles.readonlyInput}
          />

          <FormField
            label="Số điện thoại liên hệ"
            value={phone}
            onChangeText={(v) => {
              setPhone(v);
              if (!touched.phone) setTouched((t) => ({ ...t, phone: true }));
            }}
            placeholder="Ví dụ: 0901234567"
            keyboardType="phone-pad"
            error={touched.phone ? phoneError : null}
          />
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Nút lưu */}
        <View style={styles.btnWrap}>
          <PrimaryButton
            title="Lưu thay đổi"
            onPress={handleSave}
            disabled={!isValid || !hasChanged}
            loading={saving}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 14, paddingBottom: 40 },
  avatarSection: { alignItems: "center", paddingVertical: 12, gap: 6 },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: { fontSize: 44 },
  userTitle: { fontSize: 20, fontWeight: "800", color: colors.navy },
  userSubtitle: { fontSize: 13, color: colors.muted },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardHeading: { fontSize: 16, fontWeight: "800", color: colors.navy },
  divider: { height: 1, backgroundColor: colors.line },
  readonlyInput: {
    backgroundColor: "#F1F5F9",
    color: colors.muted,
  },
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
