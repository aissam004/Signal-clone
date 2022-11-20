import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from '@rneui/base';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to login',
    });
  }, [navigation]);
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            imageURL ||
            'https://changingourworld.com/wp-content/uploads/2018/01/avatar-placeholder.png',
        });
      })

      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full name'
          type='text'
          autofocus
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder='Email address'
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder='Profile picture url (optional)'
          type='text'
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
          onSubmitEditing={() => register()}
        />
      </View>
      <Button
        title='Register'
        containerStyle={styles.button}
        onPress={() => register()}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 100,
    marginTop: 10,
  },
});
