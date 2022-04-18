import { StatusBar } from 'expo-status-bar'
import { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { auth, db } from '../firebase'
import firebase from "firebase/compat/app"
import Message from '../components/Message'

const ChatScreen = ({ navigation, route }) => {

  const [input, setInput] = useState('')
  const [message, setMessage] = useState([])
  const userEmail = auth.currentUser.email

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar rounded source={{ uri: message.find(({ data }) => data.email !== userEmail)?.data.photoURL || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack} >
          <AntDesign name='arrowleft' size={24} color='white' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name='video-camera' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name='call' size={20} color='white' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigator, message])

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats')
      .doc(route.params.id)
      .collection('message')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot =>
        setMessage(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))))

    return unsubscribe
  }, [route])

  const sendMessage = () => {
    Keyboard.dismiss()

    db.collection('chats').doc(route.params.id).collection('message').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    });

    setInput('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : -80}
        style={styles.keyBoardContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView /* contentContainerStyle={{paddingTop: }} */>
              {message.map(({ id, data }) =>
                <Message key={id} id={id} data={data} />)}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput style={styles.textInput} placeholder='Send Message'
                type='text'
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage} />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color='#2b68eb' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  keyBoardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: { color: 'white', marginLeft: 7 },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 10,
    color: 'grey',
    borderRadius: 30
  }
})
