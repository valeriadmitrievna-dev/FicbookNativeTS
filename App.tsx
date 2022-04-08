import { SafeAreaView, StyleSheet, Appearance } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
} from "@expo-google-fonts/montserrat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { colors } from "./utils/colors";
import TabBarButton from "./components/TabBarButton";
import Popular from "./screens/Popular";
import Fanfic from "./screens/Fanfic";
import Fandom from "./screens/Fandom";
import CommonSearch from "./screens/CommonSearch";
import AdvancedSearch from "./screens/AdvancedSearch";

const CustomLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.mainColor,
    primary: colors.main2Color,
    card: colors.brandColor,
    border: colors.textColor,
    text: colors.textColor,
    hot: colors.orangeHEX,
    promo: {
      background: colors.brandColor,
      icon: colors.main2Color,
    },
  },
};

const CustomDarkTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#2d2d2f",
    primary: "#3e3e3f",
    card: "#696969",
    border: colors.lightGrey,
    text: colors.lightGrey,
    hot: colors.orangeHEX,
    promo: {
      background: "#474747",
      icon: "#e8e9eb",
    },
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        elevation: 0,
        shadowOpacity: 0,
        height: 60,
        borderTopWidth: 0,
      },
      tabBarButton: props => <TabBarButton {...props} />,
    })}
    initialRouteName="home"
  >
    <Tab.Screen name="home" component={Home} />
    {/* <Tab.Screen name="popular" component={Popular} /> */}
    <Tab.Screen name="advancedsearch" component={AdvancedSearch} />
  </Tab.Navigator>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
  });

  const scheme = Appearance.getColorScheme();

  if (!fontsLoaded) return <AppLoading />;
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        theme={scheme === "light" ? CustomLightTheme : CustomDarkTheme}
      >
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
          })}
          initialRouteName="main"
        >
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="fanfic" component={Fanfic} />
          <Stack.Screen name="fandom" component={Fandom} />
          <Stack.Screen name="commonsearch" component={CommonSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
