import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

const MainButton = ({
  title = "Button",
  onPress,
  loader,
  style = {},
  textStyle = {},
  activeOpacity = 0.3,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[
        styles.button,
        style,
        { backgroundColor: disabled ? Colors.SECONDARY : Colors.OFFBLACK },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {loader ? (
        <ActivityIndicator size={"small"} color={Colors.WHITE} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    lineHeight: 22.01,
    textAlign: "center",
    letterSpacing: -0.3,
    fontFamily: Fonts.medium,
  },
  button: {
    width: "100%",
    backgroundColor: Colors.OFFBLACK,
    padding: Platform.OS == "ios" ? 18 : 16,
  },
});

export default MainButton;
