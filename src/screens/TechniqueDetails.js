import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TechniqueDetails = () => {
  const route = useRoute();
  const { name, fullDesc } = route.params;

  const sliderWidth = width - 80;
  const handlePosition = useRef(new Animated.Value(0)).current;

  const [progress, setProgress] = useState(0);
  const storageKey = `@technique_progress_${name}`;


  const saveTimeout = useRef(null);  //  For debouncing

 // Load saved progress
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = await AsyncStorage.getItem(storageKey);
        if (saved !== null) {
          const savedProgress = parseInt(saved, 10);
          setProgress(savedProgress);
          const position = (savedProgress / 100) * sliderWidth;
          handlePosition.setValue(position);
        }
      } catch (e) {
        console.error("Failed to load technique progress", e);
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    // console.log('🔄 Progress changed:', progress);
  
    if (saveTimeout.current) {
      // console.log('⏱️ Clearing previous timeout...');
      clearTimeout(saveTimeout.current);
    }
  
    saveTimeout.current = setTimeout(async () => {
      try {
        // console.log('💾 Saving progress to AsyncStorage:', progress);
        await AsyncStorage.setItem(storageKey, progress.toString());
      } catch (e) {
        console.error(" Failed to save technique progress", e);
      }
    }, 500);
  
    return () => {
      // console.log(' Cleanup timeout on unmount or progress change');
      clearTimeout(saveTimeout.current);
    };
  }, [progress]);
  

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = Math.min(Math.max(gestureState.moveX - 40, 0), sliderWidth);
        handlePosition.setValue(newX);
        const percentage = Math.round((newX / sliderWidth) * 100);
        setProgress(percentage);
      },
      onPanResponderRelease: () => {
        handlePosition.flattenOffset();
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  scrollContainer: { 
    padding: 24, 
    paddingBottom: 60 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#111827', 
    marginBottom: 12 
  },
  description: { 
    fontSize: 16, 
    color: '#4B5563', 
    marginBottom: 30 
  },
  sliderWrapper: { 
    alignItems: 'center' 
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
    color: '#1F2937' 
  },
});

export default TechniqueDetails;
