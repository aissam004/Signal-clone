import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Icon, Input } from '@rneui/base';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);
  [indicatorAnimating, setIndicatorAnimating] = useState(false);
  const createChat = async () => {
    setIndicatorAnimating(true);
    try {
      await addDoc(collection(db, 'chats'), {
        chatName: input,
      });
      setIndicatorAnimating(false);
      navigation.goBack();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
        onSubmitEditing={createChat}
      />
      
      <Button title='Create new Chat' onPress={createChat} />
      {indicatorAnimating && (<ActivityIndicator size='large' style={{marginTop:20}} />)}
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:30,
    height:"100%"
  },
});
