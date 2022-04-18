import { useNavigation } from '@react-navigation/native'
import { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {

  const navigator = useNavigation()
  const [chats, setChats] = useState([])

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigator.replace('Login')
    })
  }

  useEffect(() => {
    const unsubscribe = db.collection('chats')
      .onSnapshot(snapshot => setChats(snapshot.docs
        .map(doc => ({
          id: doc.id,
          data: doc.data()
        }))))

    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigator.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (<View style={styles.headerLeftView}>
        <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      </View>),
      headerRight: () => (<View style={styles.headerRightView}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name='camerao' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigator.navigate('AddChat')}>
          <SimpleLineIcons name='pencil' size={20} color='black' />
        </TouchableOpacity>
      </View>)
    })
  }), [navigator]

  const enterChat = (id, chatName) => navigator.navigate('Chat', { id, chatName })

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headerLeftView: { marginLeft: -5 },
  headerRightView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginRight: 0
  },
  container: {
    height: '100%'
  }
})
