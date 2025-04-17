// PlanScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { plans } from '../data/plans';
import TechniqueItem from '../components/TechniqueItem';

const { width } = Dimensions.get('window');

const PlanScreen = ({ route }) => {
  const { hobby, level, icon } = route.params;

  const initialTechniques =
    plans[hobby]?.[level]?.map((name) => ({
      name,
      completed: false,
      skipped: false,
    })) || [];

  const [techniqueList, setTechniqueList] = useState(initialTechniques);

  const toggleCompleted = (index) => {
    const updated = [...techniqueList];
    updated[index].completed = !updated[index].completed;
    if (updated[index].completed) updated[index].skipped = false;
    setTechniqueList(updated);
  };

  const toggleSkipped = (index) => {
    const updated = [...techniqueList];
    updated[index].skipped = !updated[index].skipped;
    if (updated[index].skipped) updated[index].completed = false;
    setTechniqueList(updated);
  };

  const completedCount = techniqueList.filter((t) => t.completed).length;
  const total = techniqueList.length;

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
          ✅ {completedCount} of {total} completed
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
          />
        )}
      />

      {completedCount === total && total > 0 && (
        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 16 }}>
          🎉 All done! You're crushing it!
        </Text>
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
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    // backgroundColor: '#10B981',
    backgroundColor: '#14B8A6',
    borderRadius: 16,
    zIndex: 1,
  },
  progressText: {
    zIndex: 2,
    color: '#1F2937',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 40,
  },
  icon: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default PlanScreen;
