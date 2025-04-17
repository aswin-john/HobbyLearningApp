import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TechniqueItem = ({ technique, onToggleComplete, onToggleSkip, index }) => {
  const { name, completed, skipped } = technique;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        completed && styles.completed,
        skipped && styles.skipped,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles.row}>
        <TouchableOpacity onPress={onToggleComplete}>
          <Icon
            name={completed ? 'check-circle' : 'radio-button-unchecked'}
            size={22}
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
            size={20}
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
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  completed: {
    backgroundColor: '#D1FAE5',
  },
  skipped: {
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
