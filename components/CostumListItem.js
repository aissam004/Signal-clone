import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListItem, Avatar } from '@rneui/base';
const CostumListItem = ({id,chatName,enterChat}) => {
  return (
    <ListItem key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: 'https://changingourworld.com/wp-content/uploads/2018/01/avatar-placeholder.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
         ABC
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CostumListItem;

const styles = StyleSheet.create({});
