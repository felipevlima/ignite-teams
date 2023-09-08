import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";

import { useTheme } from "styled-components";
import React from "react";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme()

  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      ref={inputRef}
      {...rest}
    />
  )
}