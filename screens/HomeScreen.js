import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreen = () => {

  const navigator = useNavigation()

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigator.replace('Login')
    })
  }

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

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
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
  }
})
