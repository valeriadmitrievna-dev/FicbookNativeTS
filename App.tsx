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
import Info from "./screens/Info";
import Tags from "./screens/Tags";
import Author from "./screens/Author";
import Tag from "./screens/Tag";
import Request from "./screens/Request";

const CustomLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#DBE9D9",
    card: "#3EB489",
    primary: "#E4E986",
    secondary: "#EDFDF5",
    tertiary: "#00898B",
    border: "#292D32",
    text: "#292D32",
    textInvert: "#E7E5E2",
    hot: "#FE6900",
  },
};

const CustomDarkTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFEECB",
    card: "#7D855D",
    primary: "#A68E64",
    secondary: "#7D855D",
    tertiary: "#3B6B63",
    border: "#292D32",
    text: "#292D32",
    textInvert: "#DFE0DF",
    hot: "#FE6900",
    promo: "#A68E64",
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
    <Tab.Screen name="info" component={Info} />
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
          screenOptions={() => ({
            headerShown: false,
          })}
          initialRouteName="main"
        >
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="fanfic" component={Fanfic} />
          <Stack.Screen name="fandom" component={Fandom} />
          <Stack.Screen name="commonsearch" component={CommonSearch} />
          <Stack.Screen name="tags" component={Tags} />
          <Stack.Screen name="tag" component={Tag} />
          <Stack.Screen name="author" component={Author} />
          <Stack.Screen name="request" component={Request} />
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
