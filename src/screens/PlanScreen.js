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
    setTechniqueList(updated);
  };

  const toggleSkipped = (index) => {
    const updated = [...techniqueList];
    updated[index].skipped = !updated[index].skipped;
    setTechniqueList(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hobby}</Text>
      <Text style={styles.subTitle}>{level} Learning Plan</Text>

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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'left',
  },
  listContent: {
    paddingBottom: 40,
  },
});

export default PlanScreen;
