import { Text as NativeText, TextProps as NativeTextProps } from "react-native";
import React, { ReactElement, ReactNode } from "react";

type TextProps = {
  weight: "400" | "700";
  children: ReactNode;
} & NativeTextProps;

export default function Text({
  children,
  style,
  weight,
  ...props
}: TextProps): ReactElement {
  let fontFamily;
  if (weight === "400") {
    fontFamily = "DeliusUnicase_400Regular";
  }
  if (weight === "700") {
    fontFamily = "DeliusUnicase_700Bold";
  }
  return (
    <NativeText {...props} style={[style, { fontFamily }]}>
      {children}
    </NativeText>
  );
}
