import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png'
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          Hello
        </ListItem.Subtitle>
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
