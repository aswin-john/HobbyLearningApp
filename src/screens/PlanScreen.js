// PlanScreen.js
import React, { useState, useEffect, useRef,useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity
} from 'react-native';
import { useDebouncedAsyncStorage } from '../hooks/useDebouncedAsyncStorage';
import { MOTIVATIONAL_QUOTES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfettiCannon from 'react-native-confetti-cannon';
import { plans } from '../data/plans';
import TechniqueItem from '../components/TechniqueItem';

const { width, height } = Dimensions.get('window');



const PlanScreen = ({ route }) => {
  const { hobby, level, icon } = route.params;
  const storageKey = `@progress_${hobby}_${level}`;

  const initialTechniques = Object.entries(plans[hobby]?.[level] || {}).map(
    ([name, desc]) => ({
      name,
      shortDesc: desc.split('. ').slice(0, 2).join('. ') + '.',
      fullDesc: desc,
      completed: false,
      skipped: false,
    })
  );

  const [techniqueList, setTechniqueList] = useState(initialTechniques);
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;

  // Load saved progress
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedData = await AsyncStorage.getItem(storageKey);
        if (savedData) {
          setTechniqueList(JSON.parse(savedData));
        }
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    };
    loadProgress();
  }, []);

  // Use custom hook for debounced saving
  useDebouncedAsyncStorage(storageKey, techniqueList);

  const resetProgress = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
      setTechniqueList(initialTechniques);
      setExpandedIndex(null);
      setShowPopup(false);
      setShowConfetti(false);
      setQuote(MOTIVATIONAL_QUOTES[0]);
    } catch (e) {
      console.error('Failed to reset progress.', e);
    }
  };
  
  

  const toggleCompleted = useCallback((index) => {
    const updated = [...techniqueList];
    updated[index].completed = !updated[index].completed;
    if (updated[index].completed) updated[index].skipped = false;
    setTechniqueList(updated);

    const newQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setQuote(newQuote);
  }, [techniqueList]);

  const toggleSkipped = useCallback((index) => {
    const updated = [...techniqueList];
    updated[index].skipped = !updated[index].skipped;
    if (updated[index].skipped) updated[index].completed = false;
    setTechniqueList(updated);
  }, [techniqueList]);

  const completedCount = techniqueList.filter((t) => t.completed).length;
  const total = techniqueList.length;
  const allCompleted = completedCount === total && total > 0;

  useEffect(() => {
    if (allCompleted) {
      setShowPopup(true);
      setShowConfetti(true);

      const anim = Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          delay: 1500,
          useNativeDriver: true,
        }),
      ]);

      anim.start(() => setShowPopup(false));

      return () => animation.stopAnimation();
    }
  }, [allCompleted]);
  

  const hasProgress = techniqueList.some(t => t.completed || t.skipped);


  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.headerText}>{hobby}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{level}</Text>
        </View>
      </View>

      <View style={styles.progressPill}>
        <View style={[styles.progressBar, { width: `${(completedCount / total) * 100}%` }]} />
        <Text style={styles.progressText}>
          {completedCount} of {total} completed
        </Text>
      </View>

      <FlatList
        data={techniqueList}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TechniqueItem
            technique={item}
            onToggleComplete={() => toggleCompleted(index)}
            onToggleSkip={() => toggleSkipped(index)}
            index={index}
            isExpanded={expandedIndex === index}
            onToggleExpand={() =>
              setExpandedIndex((prev) => (prev === index ? null : index))
            }
          />
        )}
        initialNumToRender={6} 
      />

      {completedCount > 0 && !allCompleted && total > 0 && (
        <Text style={styles.quoteText}>{quote}</Text>
      )}

{hasProgress && (
  <TouchableOpacity
    style={styles.resetButton}
    onPress={resetProgress}
  >
    <Text style={styles.resetButtonText}>Reset Progress</Text>
  </TouchableOpacity>
)}




      <Modal
        transparent
        animationType="fade"
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>🎉 All done! You're crushing it!</Text>
          </View>
        </View>
      </Modal>

      {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{ x: width / 2, y: height }}
          fadeOut={true}
          colors={["#F472B6", "#34D399", "#60A5FA", "#FBBF24"]}
          explosionSpeed={250}
          fallSpeed={4500}
          autoStart={true}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    flex: 1,
  },
  badge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#3730A3',
    fontWeight: '600',
  },
  progressPill: {
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#14B8A6',
    borderRadius: 16,
    zIndex: 1,
  },
  progressText: {
    zIndex: 2,
    color: '#1F2937',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'System',
  },
  listContainer: {
    paddingBottom: 40,
  },
  icon: {
    fontSize: 28,
    marginRight: 8,
  },
  quoteText: {
    fontSize: 15,
    color: '#0F766E',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
    fontStyle: 'italic',
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
  },
  popupText: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '700',
    textAlign: 'center',
  },

  resetButton: {
    marginTop: 20,
    backgroundColor: '#0F766E',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    
    alignSelf: 'center',
    marginBottom: 10,
    width: '50%',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  


});

export default PlanScreen;