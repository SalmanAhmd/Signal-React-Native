import { StyleSheet, Text, View } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
import { StatusBar } from 'expo-status-bar'

const AddChatScreen = () => {

  const [input, setInput] = useState('')

  const navigator = useNavigation()

  useLayoutEffect(() => {
    navigator.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats'
    })
  }, [navigator])

  const createNewChat = async () => {
    await db.collection('chats').add({
      chatName: input
    })
      .then(() => navigator.goBack())
      .catch(err => alert(err.message))
  }

  return (
    <View style={styles.containter}>
      <StatusBar style='light' />
      <Input placeholder='Enter a chat name'
        type='text'
        leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black' />}
        onChangeText={text => setInput(text)}
        onSubmitEditing={createNewChat} />
      <Button onPress={createNewChat} title='Create new Chat' />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  containter: {
    backgroundColor: 'white',
    padding: 15,
    height: '100%'
  }
})
