import { TouchableOpacityProps } from "react-native";
import { Container, FiletrStyleProps, Title } from "./styles";

type Props = TouchableOpacityProps & FiletrStyleProps & {
  title: string;
}

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}