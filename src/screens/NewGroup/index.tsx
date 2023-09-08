import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback } from "react-native";
import { Container, Content, Icon, SafeAreaView } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Hightlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch(err) {
      if (err instanceof AppError) {
        Alert.alert('Novo Grupo', err.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo.')
      }
      
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container>
          <Header showBackButton/>
          <Content>
            <Icon />
            <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas"/>
            <Input placeholder="Nome da turma" onChangeText={setGroup}/>
            <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew}/>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}