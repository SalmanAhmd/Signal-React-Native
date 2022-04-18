import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigator = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigator.replace('Home')
      }
    })

    return unsubscribe
  }, [])

  const signIn = () => {
    console.log({ email, password });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : -80}
      style={styles.container}>
      <StatusBar style='light' />
      <Image source={{
        uri: 'https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png'
      }}
        style={{ width: 120, height: 120 }}
      />
      <View style={styles.inputContainer}>
        <Input placeholder='Email'
          autoFocus type='email'
          onChangeText={text => setEmail(text)} />
        <Input placeholder='Password'
          secureTextEntry type='password'
          onChangeText={text => setPassword(text)} />
      </View>
      <Button containerStyle={styles.button} title={'Login'}
        onPress={signIn}
      />
      <Button containerStyle={styles.button} type='outline' title={'Register'}
        onPress={() => navigator.navigate('Register')}
      />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: 300,
    paddingTop: 20
  },
  button: {
    width: 300,
    marginTop: 10
  }
})
