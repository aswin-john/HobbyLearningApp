import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TechniqueItem = ({ technique, onToggleComplete, onToggleSkip }) => {
  const isCompleted = technique.completed;
  const isSkipped = technique.skipped;

  return (
    <View style={[styles.item, isCompleted && styles.completed, isSkipped && styles.skipped]}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onToggleComplete}>
          <Icon
            name={isCompleted ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={isCompleted ? 'green' : 'gray'}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.text,
            isSkipped && { textDecorationLine: 'line-through', color: '#999' },
          ]}
        >
          {technique.name}
        </Text>

        <TouchableOpacity onPress={onToggleSkip}>
          <Icon
            name="cancel"
            size={24}
            color={isSkipped ? 'red' : 'gray'}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
});

export default TechniqueItem;
