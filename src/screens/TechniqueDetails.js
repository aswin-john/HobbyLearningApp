// TechniqueDetails.js
import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TechniqueDetails = () => {
  const route = useRoute();
  const { name, fullDesc } = route.params;
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const sliderWidth = width - 80;
  const handlePosition = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = Math.min(Math.max(gestureState.moveX - 40, 0), sliderWidth);
        handlePosition.setValue(newX);
        const percentage = Math.round((newX / sliderWidth) * 100);
        setProgress(percentage);
      },
      onPanResponderRelease: async () => {
        handlePosition.flattenOffset();
        const currentValue = handlePosition.__getValue();
        const finalProgress = Math.round((currentValue / sliderWidth) * 100);
        if (finalProgress >= 99 && !showPopup) {
          setProgress(finalProgress);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        }
      },
    })
  ).current;

  const interpolatedWidth = handlePosition.interpolate({
    inputRange: [0, sliderWidth],
    outputRange: [0, sliderWidth],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{fullDesc}</Text>

        <View style={styles.sliderWrapper}>
          <View style={styles.sliderTrack}>
            <Animated.View style={[styles.sliderFill, { width: interpolatedWidth }]} />
            <Animated.View
              {...panResponder.panHandlers}
              style={[styles.dragHandle, { left: Animated.subtract(interpolatedWidth, 20) }]}
            />
          </View>
          <Text style={styles.progressText}>{progress}% Complete</Text>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>✅ You have completed {name}.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 30,
  },
  sliderWrapper: {
    alignItems: 'center',
  },
  sliderTrack: {
    height: 20,
    width: width - 80,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#14B8A6',
    top: 0,
    left: 0,
  },
  dragHandle: {
    position: 'absolute',
    top: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    elevation: 5,
  },
  progressText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  popupContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
    marginHorizontal: 20,
  },
  popupText: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default TechniqueDetails;