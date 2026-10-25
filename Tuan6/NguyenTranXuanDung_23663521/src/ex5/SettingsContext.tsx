import React, { createContext, useContext, useState, useMemo } from "react";

interface SettingsContextType {
  notify: boolean;
  setNotify: (val: boolean) => void;
  dark: boolean;
  setDark: (val: boolean) => void;
  theme: {
    bg: string;
    cardBg: string;
    text: string;
    muted: string;
    border: string;
  };
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // TODO 1: 2 state: notify (mặc định true) và dark (mặc định false)
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  // TODO 3 (nâng cao): Tính toán màu sắc tương ứng theo chế độ sáng/tối
  const theme = useMemo(
    () => ({
      bg: dark ? "#121212" : "#F4F5F7",
      cardBg: dark ? "#1E1E1E" : "#FFFFFF",
      text: dark ? "#F9FAFB" : "#1F2430",
      muted: dark ? "#9CA3AF" : "#6B7280",
      border: dark ? "#2E2E2E" : "#E5E7EB",
    }),
    [dark]
  );

  const value = useMemo(
    () => ({
      notify,
      setNotify,
      dark,
      setDark,
      theme,
    }),
    [notify, dark, theme]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
};
