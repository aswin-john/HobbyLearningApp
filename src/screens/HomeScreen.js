import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Optional
import { useNavigation } from '@react-navigation/native';

const hobbyData = [
  { id: '1', name: 'Chess', icon: '♟️', level: 'Beginner', color: '#F3F4F6' },
  { id: '2', name: 'Guitar', icon: '🎸', level: 'Intermediate', color: '#FDE68A' },
  { id: '3', name: 'Running', icon: '🏃', level: 'Beginner', color: '#E9D5FF' },
  { id: '4', name: 'Music', icon: '🎵', level: 'Beginner', color: '#E0F2FE' },
  { id: '5', name: 'Reading', icon: '📚', level: 'Beginner', color: '#FEF9C3' },
  { id: '6', name: 'Cooking', icon: '🍳', level: 'Beginner', color: '#DCFCE7' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => setSelected(item);

  const handleStart = () => {
    if (selected) {
      navigation.navigate('Plan', { hobby: selected.name, level: selected.level });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tile,
        { backgroundColor: item.color },
        selected?.id === item.id && styles.selectedTile,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select hobbies & interests.</Text>

      <FlatList
        data={hobbyData}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.gridContainer}
      />

      <TouchableOpacity
        style={[styles.startBtn, !selected && { opacity: 0.4 }]}
        disabled={!selected}
        onPress={handleStart}
      >
        <Text style={styles.startText}>Start</Text>
        <Icon name="arrow-right" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#111827',
    textAlign: 'left',
  },
  gridContainer: {
    paddingBottom: 40,
  },
  grid: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tile: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  selectedTile: {
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  icon: {
    fontSize: 24,
    marginBottom: 6,
  },
  name: {
    fontSize: 14,
    color: '#111',
  },
  startBtn: {
    marginTop: 'auto',
    flexDirection: 'row',
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
