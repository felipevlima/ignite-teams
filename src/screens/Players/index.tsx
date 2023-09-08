import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Hightlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Button } from "@components/Button";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParam = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const navigate = useNavigation()

  const { group } = route.params as RouteParam

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nenhuma pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)
      setNewPlayerName('')
      // Keyboard.dismiss()
      newPlayerNameInputRef.current?.blur()
      fetchPlayerByTeam()
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possivel adicionar')
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      const playersbyTeam = await playersGetByGroupAndTeam(group, team)

      setPlayers(playersbyTeam)
    } catch(err) {
      console.log(err)
      Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selectionado.')
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayerByTeam()
    } catch(err) {
      Alert.alert('Remover', 'Não foi possivel remover essa pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigate.navigate('groups')
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

  useEffect(() => {
    fetchPlayerByTeam()
  }, [team])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Header showBackButton/>
        <Highlight title={group} subtitle="adicione a galera e separa os times"/>

        <Form>
          <Input 
            value={newPlayerName} 
            placeholder="Nome da pessoa" 
            autoCorrect={false} 
            onChangeText={setNewPlayerName} 
            inputRef={newPlayerNameInputRef} 
            onSubmitEditing={handleAddPlayer} 
            returnKeyType="done"
          />
          <ButtonIcon icon="add" type="PRIMARY" onPress={handleAddPlayer}/>
        </Form>

        <HeaderList>
          <FlatList 
            data={['Time A', 'Time B']}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Filter title={item} isActive={item === team} onPress={() => setTeam(item)}/>
              )}
            horizontal
          />
          <NumbersOfPlayers>
            {players.length}
          </NumbersOfPlayers>
        </HeaderList>

        <FlatList 
          data={players}
          keyExtractor={item => item.name}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)}/>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time."/>
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
        />

        <Button title="Remover Turma" type="SECONDARY" onPress={handleGroupRemove}/>
      </Container>
    </TouchableWithoutFeedback>
  )
}