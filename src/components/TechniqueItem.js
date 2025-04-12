import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TechniqueItem = ({ technique, onPress, onLongPress }) => {
  const getItemStyle = () => {
    if (technique.completed) return styles.completed;
    if (technique.skipped) return styles.skipped;
    return styles.defaultItem;
  };

  return (
    <TouchableOpacity
      style={[styles.defaultItem, getItemStyle()]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={styles.text}>{technique.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  completed: {
    backgroundColor: '#c8f7c5',
  },
  skipped: {
    backgroundColor: '#f7c5c5',
  },
  text: {
    fontSize: 16,
  },
});

export default TechniqueItem;
