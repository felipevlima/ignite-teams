import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import * as S from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Hightlight'
import { GroupCard } from '@components/GroupCard'
import { useCallback, useState } from 'react'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll'

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigate = useNavigation()

  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      setGroups(data)
    } catch(err) {
      console.log(err)
    }
  }

  function handleOpenGroup(group: string) {
    navigate.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <S.Container>
      <Header />
      <Highlight title='Tumas' subtitle='Jogue com a sua turma'/>

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} refreshScreen={fetchGroups}/>}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?'/>}
      />
      <Button title='Criar nova turma' onPress={() => navigate.navigate('new')}/>
    </S.Container>
  )
}

