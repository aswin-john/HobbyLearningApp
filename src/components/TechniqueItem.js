import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TechniqueItem = ({ technique, onToggleComplete, onToggleSkip }) => {
  const { name, completed, skipped } = technique;

  return (
    <View
      style={[
        styles.card,
        completed && styles.completedCard,
        skipped && styles.skippedCard,
      ]}
    >
      <View style={styles.row}>
        <TouchableOpacity onPress={onToggleComplete}>
          <Icon
            name={completed ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={completed ? 'green' : '#9CA3AF'}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.text,
            skipped && { textDecorationLine: 'line-through', color: '#9CA3AF' },
          ]}
        >
          {name}
        </Text>

        <TouchableOpacity onPress={onToggleSkip}>
          <Icon
            name="cancel"
            size={24}
            color={skipped ? 'red' : '#D1D5DB'}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  completedCard: {
    backgroundColor: '#D1FAE5',
  },
  skippedCard: {
    backgroundColor: '#FECACA',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: '#111827',
  },
});

export default TechniqueItem;
