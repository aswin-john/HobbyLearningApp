import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#E0F2F1', '#CFFAFE']}   // Soft teal gradients
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      {navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={22} color="#0F766E" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{formatTitle(title)}</Text>
    </LinearGradient>
  );
};

// Optional: Format route names nicely
const formatTitle = (routeName) => {
  switch (routeName) {
    case 'Home': return '🏠 Home';
    case 'Plan': return '📝 Your Plan';
    case 'TechniqueDetails': return '📋 Technique';
    default: return routeName;
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F2F1',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',   // Dark Slate for contrast
  },
});

export default CustomHeader;
