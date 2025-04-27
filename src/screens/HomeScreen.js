import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { HOBBY_DATA, SKILL_LEVELS, ROUTES } from '../constants';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleHobbySelect = useCallback((item) => {
    setSelectedHobby(item);
    setSelectedSkill(null);
    setModalVisible(true);
  }, []);

  const handleSkillSelect = useCallback((skill) => {
    setSelectedSkill(skill);
    setModalVisible(false);
  }, []);

  const handleStart = useCallback(() => {
    if (selectedHobby && selectedSkill) {
      navigation.navigate(ROUTES.PLAN, {
        hobby: selectedHobby.name,
        icon: selectedHobby.icon, 
        level: selectedSkill,
      });
    }
  }, [selectedHobby, selectedSkill, navigation]);

  // Memoize this function to prevent recreation on every render
  const renderHobbyItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={[
        styles.tile,
        { backgroundColor: item.color },
        selectedHobby?.id === item.id && styles.selectedTile,
      ]}
      onPress={() => handleHobbySelect(item)}
      accessible
      accessibilityLabel={`Select hobby ${item.name}`}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  ), [selectedHobby, handleHobbySelect]);

  // Pre-compute the disabled state for start button
  const startButtonDisabled = !(selectedHobby && selectedSkill);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select hobbies & interests.</Text>

      <FlatList
        data={HOBBY_DATA}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderHobbyItem}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.gridContainer}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={3}
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
        style={[styles.startBtn, startButtonDisabled && { opacity: 0.4 }]}
        disabled={startButtonDisabled}
        onPress={handleStart}
        accessible
        accessibilityLabel="Start planning"
      >
        <Text style={styles.startText}>Start</Text>
        <Icon name="arrow-right" size={18} color="#fff" />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        useNativeDriver={true}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Pick your skill level</Text>

          <View style={styles.skillGrid}>
            {SKILL_LEVELS.map((level, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.skillTile,
                  selectedSkill === level && styles.selectedSkillTile,
                ]}
                onPress={() => handleSkillSelect(level)}
                accessible
                accessibilityLabel={`Select skill level ${level}`}
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
