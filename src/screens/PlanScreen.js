import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/globalStyles';
import { plans } from '../data/plans';
import TechniqueItem from '../components/TechniqueItem';

const PlanScreen = ({ route }) => {
  const { hobby, level } = route.params;

  const initialTechniques = plans[hobby]?.[level]?.map(name => ({
    name,
    completed: false,
    skipped: false,
  })) || [];

  const [techniqueList, setTechniqueList] = useState(initialTechniques);

  const toggleCompleted = (index) => {
    const updatedList = [...techniqueList];
    updatedList[index].completed = !updatedList[index].completed;
    setTechniqueList(updatedList);
  };

  const toggleSkipped = (index) => {
    const updatedList = [...techniqueList];
    updatedList[index].skipped = !updatedList[index].skipped;
    setTechniqueList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${hobby} - ${level}`}</Text>
      <FlatList
        data={techniqueList}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <TechniqueItem
            technique={item}
            onPress={() => toggleCompleted(index)}
            onLongPress={() => toggleSkipped(index)}
          />
        )}
      />
    </View>
  );
};

export default PlanScreen;
