import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./styles";
import logo from '@assets/logo.png'

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigate = useNavigation()

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={() => navigate.navigate('groups')}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logo}/>
    </Container>
  )
}