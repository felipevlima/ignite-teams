import {  Alert, Text, TouchableOpacityProps } from "react-native"
import { Container, Icon, RemoveButton, RemoveText, SwipeoutContainer, Title } from "./styles"
import Swipeout from "react-native-swipeout"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"

type Props = TouchableOpacityProps & {
  title: string
  refreshScreen: () => void
}

export function GroupCard({ title, refreshScreen, ...rest }: Props) {
  let swipeBtns = [{
    text: 'Remove',
    backgroundColor: 'transparent',
    component: <RemoveButton><RemoveText>Remover</RemoveText></RemoveButton>,
    onPress: () => handleGroupRemove()
  }];

  async function groupRemove() {
    try {
      await groupRemoveByName(title)
      refreshScreen()
    } catch(err) {
      Alert.alert('Remover grupo', 'Não foi possivel remover o grupo.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }

  return (
    <SwipeoutContainer right={swipeBtns} autoClose backgroundColor="transparent">
      <Container {...rest}>
        <Icon />
        <Title>
          {title}
        </Title>
      </Container>
    </SwipeoutContainer>
  )
}
