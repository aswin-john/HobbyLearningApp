import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TechniqueItem = ({ technique, onPress, onLongPress }) => {
  let icon = 'check-box-outline-blank';
  if (technique.completed) icon = 'check-box';
  if (technique.skipped) icon = 'cancel';

  const itemStyle = [
    styles.item,
    technique.completed && styles.completed,
    technique.skipped && styles.skipped,
  ];

  return (
    <TouchableOpacity style={itemStyle} onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.row}>
        <Icon name={icon} size={24} color={technique.skipped ? 'red' : 'green'} />
        <Text style={styles.text}>{technique.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  completed: { backgroundColor: '#c8f7c5' },
  skipped: { backgroundColor: '#f7c5c5' },
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { fontSize: 16, marginLeft: 10 },
});

export default TechniqueItem;
