import "./polyfills.js";
import { registerRootComponent } from "expo";
import React from "react";
import App from "./App";
import { LogBox } from "react-native";

export default registerRootComponent(() => <App />);

LogBox.ignoreLogs(["Warning: ..."]);
