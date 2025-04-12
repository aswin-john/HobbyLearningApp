import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a Hobby & Level</Text>
      <Button
        title="Chess - Beginner"
        onPress={() => navigation.navigate('Plan', { hobby: 'Chess', level: 'Beginner' })}
      />
      <Button
        title="Guitar - Intermediate"
        onPress={() => navigation.navigate('Plan', { hobby: 'Guitar', level: 'Intermediate' })}
      />
    </View>
  );
};

export default HomeScreen;
