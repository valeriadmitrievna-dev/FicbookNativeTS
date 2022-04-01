import "./polyfills.js";
import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";
import { LogBox } from "react-native";

export default registerRootComponent(() => <App />);

LogBox.ignoreLogs([
  'Warning: Each child in a list should have a unique "key" prop.',
  "Warning: Encountered two children with the same key",
]);
