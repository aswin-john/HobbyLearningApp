import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TechniqueItem = ({ technique, onToggleComplete, onToggleSkip }) => {
  const { name, completed, skipped } = technique;

  return (
    <Animated.View
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
            color={completed ? '#10B981' : '#9CA3AF'}
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
            color={skipped ? '#EF4444' : '#D1D5DB'}
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    transition: 'all 0.3s',
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
    color: '#1F2937',
  },
});

export default TechniqueItem;
