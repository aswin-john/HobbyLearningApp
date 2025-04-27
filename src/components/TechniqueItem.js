import React, { useRef, useEffect, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TechniqueItem = ({
  technique,
  onToggleComplete,
  onToggleSkip,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  const { name, completed, skipped, shortDesc } = technique;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const arrowAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Only run entrance animation once on mount
  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50, // Reduced delay for faster rendering
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        delay: index * 50, // Reduced delay
        useNativeDriver: true,
      }),
    ]);
    
    animation.start();
    
    return () => animation.stop();
  }, []);

  // Handle arrow animation
  useEffect(() => {
    Animated.timing(arrowAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const arrowRotation = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

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
        <TouchableOpacity 
          onPress={onToggleComplete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name={completed ? 'check-circle' : 'radio-button-unchecked'}
            size={22}
            color={completed ? '#10B981' : '#9CA3AF'}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onToggleExpand} 
          style={styles.titleWrapper}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.text, skipped && styles.skippedText]}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
            <Icon name="keyboard-arrow-down" size={22} color="#6B7280" />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onToggleSkip}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name="cancel"
            size={20}
            color={skipped ? '#EF4444' : '#D1D5DB'}
          />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.accordionContent}>
          <Text
            style={[styles.description, skipped && styles.skippedText]}
          >
            {shortDesc}
          </Text>
          <TouchableOpacity
            style={styles.seeMoreBtn}
            onPress={() => navigation.navigate('TechniqueDetails', { 
              name, 
              fullDesc: technique.fullDesc 
            })}
          >
            <Text style={styles.seeMoreText}>See More</Text>
          </TouchableOpacity>
        </View>
      )}
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
  titleWrapper: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 16,
    flex: 1,
    color: '#1F2937',
  },
  skippedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  accordionContent: {
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginTop: 4,
  },
  seeMoreBtn: {
    marginTop: 8,
    paddingVertical: 4,
  },
  seeMoreText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});

// Using React.memo to prevent unnecessary renders
export default memo(TechniqueItem);