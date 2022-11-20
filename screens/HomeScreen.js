import {
    FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Avatar, Button, Icon } from '@rneui/base';
import { signOut } from 'firebase/auth';
import { auth,db } from '../firebase';
import CostumListItem from '../components/CostumListItem';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { onSnapshot,collection } from "firebase/firestore";
import { StatusBar } from 'expo-status-bar';
const HomeScreen = ({ navigation }) => {
   
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, "chats"), (collection) => {
        
        setChats(collection.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
        })))
      });
  },[])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 70,
            marginRight: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' color='black' size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name='pencil' color='black' size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      data={chats}
      keyExtractor={(item)=>item.id}
      renderItem={({item}) => (
       <CostumListItem id={item.id} chatName={item.data.chatName}/>
      )}
      />
       
      
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
});
