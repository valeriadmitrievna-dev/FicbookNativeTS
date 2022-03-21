import { SafeAreaView, StyleSheet, Appearance } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Fanfic from "./screens/Fanfic";
import Fandom from "./screens/Fandom";
import { colors } from "./utils/colors";
import TabBarButton from "./components/TabBarButton";
import Popular from "./screens/Popular";

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

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
  });

  const scheme = Appearance.getColorScheme();

  if (!fontsLoaded) return <AppLoading />;
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        theme={scheme === "light" ? CustomLightTheme : CustomDarkTheme}
      >
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
          initialRouteName="popular"
        >
          <Tab.Group>
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="popular" component={Popular} />
            <Tab.Screen name="fanfic" component={Fanfic} />
            <Tab.Screen name="fandom" component={Fandom} />
          </Tab.Group>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
