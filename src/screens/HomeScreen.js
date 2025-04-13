import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, local.bg]}>
      <Text style={local.headerText}>🎯 Choose Your Hobby & Level</Text>

      <TouchableOpacity
        style={local.card}
        onPress={() => navigation.navigate('Plan', { hobby: 'Chess', level: 'Beginner' })}
      >
        <LinearGradient colors={['#667eea', '#764ba2']} style={local.gradient}>
          <Text style={local.cardText}>♟️ Chess - Beginner</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={local.card}
        onPress={() => navigation.navigate('Plan', { hobby: 'Guitar', level: 'Intermediate' })}
      >
        <LinearGradient colors={['#f7971e', '#ffd200']} style={local.gradient}>
          <Text style={local.cardText}>🎸 Guitar - Intermediate</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const local = StyleSheet.create({
  bg: {
    justifyContent: 'center',
    backgroundColor: '#f4f6fc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradient: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
