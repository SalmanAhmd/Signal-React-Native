import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useLayoutEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageURL, setImageURL] = useState('')

  const navigator = useNavigation()

  useLayoutEffect(() => {
    navigator.setOptions({
      headerBackTitle: 'Back To Login'
    })
  }, [navigator])

  const registerIn = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          // http://surl.li/buhxf
          photoURL: imageURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png'
        })
      })
      .catch(err => alert(err.message))
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : -80}
      style={styles.container}>
      <StatusBar style='light' />

      <Text h3 style={styles.titleText}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder='Full Name'
          autoFocus type='text'
          onChangeText={text => setName(text)} />
        <Input placeholder='Email'
          autoFocus type='email'
          onChangeText={text => setEmail(text)} />
        <Input placeholder='Password'
          secureTextEntry type='password'
          onChangeText={text => setPassword(text)} />
        <Input placeholder='Profile Picture URL (optional)'
          autoFocus type='imageURL'
          onChangeText={text => setImageURL(text)}
          onSubmitEditing={registerIn}
        />
      </View>

      <Button raised containerStyle={styles.button} title={'Register'}
        onPress={registerIn}
      />

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 50,
    paddingTop: 20,
    fontSize: 22
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10
  }
})
