// import moment from "moment"
import { StyleSheet, Text, View } from "react-native"
import { Avatar } from "react-native-elements"
import { auth } from "../firebase"

function Message({ id, data }) {
  const isUserLoggedIn = auth.currentUser.email !== data.email
  const TypeOfText = isUserLoggedIn ? styles.sender : styles.reciever
  const TypeOfView = isUserLoggedIn ? styles.senderContainer : styles.recieverContainer

  return (
    <View key={id} style={[styles.container, TypeOfView]}>
      <Avatar
        position='absolute'
        rounded
        bottom={-15}
        {...isUserLoggedIn ? { left: -5 } : { right: -5 }}
        size={30}
        // Web
        containerStyle={{
          position: 'absolute',
          bottom: -15,
          ...isUserLoggedIn ? { left: -5 } : { right: -5 }
        }}
        source={{
          uri: data.photoURL
        }} />
      <Text style={[styles.text, TypeOfText]}>
        {data.message}
        {/* {data.timestamp ? moment(data.timestamp).format('LT') : '...'} */}
      </Text>
      {isUserLoggedIn && <Text style={[styles.senderName]}>
        {data.displayName}
      </Text>}
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 20,
    maxWidth: '80%',
    minWidth: 150,
    position: 'relative',
    margin: 10
  },
  senderContainer: {
    backgroundColor: '#2868e6',
    alignSelf: 'flex-start',
  },
  recieverContainer: {
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
  },
  text: {
    padding: 15,
    textAlign: 'left',
    fontWeight: '500',
  },
  sender: {
    color: 'white'
  },
  reciever: {
  },
  senderName: {
    marginLeft: 20,
    marginBottom: -20,
    marginTop:20
  }
})
