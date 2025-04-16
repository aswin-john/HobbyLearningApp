import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { plans } from '../data/plans';
import TechniqueItem from '../components/TechniqueItem';

const PlanScreen = ({ route }) => {
  const { hobby, level } = route.params;

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{hobby} 🎯</Text>
      <Text style={styles.subTitle}>{level} Plan</Text>
      <Text style={styles.progressText}>
        ✅ {completedCount} of {techniqueList.length} techniques completed
      </Text>

      <FlatList
        data={techniqueList}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TechniqueItem
            technique={item}
            onToggleComplete={() => toggleCompleted(index)}
            onToggleSkip={() => toggleSkipped(index)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 24,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 60,
  },
});

export default PlanScreen;
