import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const hobbyData = [
  { id: '1', name: 'Chess', icon: '♟️', color: '#F3F4F6' },
  { id: '2', name: 'Guitar', icon: '🎸', color: '#FDE68A' },
  { id: '3', name: 'Running', icon: '🏃', color: '#E9D5FF' },
  { id: '4', name: 'Music', icon: '🎵', color: '#E0F2FE' },
  { id: '5', name: 'Reading', icon: '📚', color: '#FEF9C3' },
  { id: '6', name: 'Cooking', icon: '🍳', color: '#DCFCE7' },
];

const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleHobbySelect = (item) => {
    setSelectedHobby(item);
    setSelectedSkill(null); // reset skill
    setModalVisible(true);  // open skill selector
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setModalVisible(false);
  };

  const handleStart = () => {
    if (selectedHobby && selectedSkill) {
      navigation.navigate('Plan', {
        hobby: selectedHobby.name,
        level: selectedSkill,
      });
    }
  };

  const renderHobbyItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tile,
        { backgroundColor: item.color },
        selectedHobby?.id === item.id && styles.selectedTile,
      ]}
      onPress={() => handleHobbySelect(item)}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select hobbies & interests.</Text>

      <FlatList
        data={hobbyData}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderHobbyItem}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.gridContainer}
      />


{selectedHobby && selectedSkill && (
  <View style={styles.selectedInfo}>
    <Text style={styles.selectedText}>
      You chose <Text style={styles.highlight}>{selectedHobby.name}</Text> as your hobby and{' '}
      <Text style={styles.highlight}>{selectedSkill}</Text> as your skill level.
    </Text>
  </View>
)}


      <TouchableOpacity
        style={[styles.startBtn, !(selectedHobby && selectedSkill) && { opacity: 0.4 }]}
        disabled={!(selectedHobby && selectedSkill)}
        onPress={handleStart}
      >
        <Text style={styles.startText}>Start</Text>
        <Icon name="arrow-right" size={18} color="#fff" />
      </TouchableOpacity>

      <Modal
  isVisible={isModalVisible}
  onBackdropPress={() => setModalVisible(false)}
  style={styles.modal}
>
  <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>Pick your skill level</Text>

    <View style={styles.skillGrid}>
      {skillLevels.map((level, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.skillTile,
            selectedSkill === level && styles.selectedSkillTile,
          ]}
          onPress={() => handleSkillSelect(level)}
        >
          <Text style={styles.skillLabel}>{level}</Text>
        </TouchableOpacity>
      ))}
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
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#111827',
    textAlign: 'left',
  },
  gridContainer: {
    paddingBottom: 40,
  },
  grid: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tile: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  selectedTile: {
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  icon: {
    fontSize: 24,
    marginBottom: 6,
  },
  name: {
    fontSize: 14,
    color: '#111',
  },
  startBtn: {
    marginTop: 'auto',
    flexDirection: 'row',
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827',
    textAlign: 'center',
  },


  skillGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },

  skillTile: {
    width: '30%',
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  selectedSkillTile: {
    backgroundColor: '#E0E7FF',
    borderColor: '#6366F1',
    borderWidth: 2,
  },

  skillLabel: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },

  // skillButton: {
  //   backgroundColor: '#F3F4F6',
  //   padding: 14,
  //   borderRadius: 12,
  //   marginBottom: 10,
  //   alignItems: 'center',
  // },
  // skillText: {
  //   fontSize: 16,
  //   color: '#111827',
  // },
  selectedInfo: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectedText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#111827',
  },
  
});

export default HomeScreen;
