import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, TabParamList } from "./types";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// TODO 1: function HomeTabs() — Tab.Navigator (headerShown: false) với 2 Tab.Screen:
// "Products" (ProductsTab) và "Favorites" (FavoritesTab), mỗi tab có icon Ionicons.
function HomeTabs() {
  const { ids } = useFavorites();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "pricetags";
          if (route.name === "Products") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{ title: "Sản phẩm" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{
          title: "Yêu thích",
          tabBarBadge: ids.length > 0 ? ids.length : undefined,
        }}
      />
    </Tab.Navigator>
  );
}

// TODO 2: export function StackTabApp() — <FavoritesProvider><NavigationContainer><Stack.Navigator>
// Stack.Screen "Home" (component HomeTabs, title "Cửa hàng")
// Stack.Screen "ProductDetails" (component ProductDetailsScreen, title "Chi tiết sản phẩm")
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#FFFFFF" },
            headerTitleAlign: "center",
            headerTitleStyle: { fontWeight: "700", fontSize: 17 },
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: "Cửa hàng" }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
