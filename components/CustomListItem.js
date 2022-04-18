import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { auth, db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessage] = useState([])
  const userEmail = auth.currentUser.email

  useEffect(() => {
    const unsubscribe = db.collection('chats')
      .doc(id)
      .collection('message')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setChatMessage(snapshot.docs.map(doc => (doc.data()))))

    return unsubscribe
  }, [])

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages.find(({ email }) => email !== userEmail)?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png'
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          {chatName}
        </ListItem.Title>
        {!!chatMessages.length && <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {chatMessages[0]?.displayName} : {chatMessages[0]?.message}
        </ListItem.Subtitle>}
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
  title: {
    fontWeight: '800'
  }
})
