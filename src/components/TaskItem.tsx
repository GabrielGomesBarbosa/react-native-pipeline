import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CheckBox from './CheckBox';
import TrashButton from './TrashButton';

type TaskItemProps = {
  defaultValue?: boolean;
  label?: string;
  removeTask?: () => void;
};

export default function TaskItem({
  defaultValue = false,
  label,
  removeTask,
}: TaskItemProps) {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleCheck = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <View
      style={[styles.container, isChecked ? styles.checked : styles.unChecked]}>
      <View
        style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16}}>
        <CheckBox checked={isChecked} onChange={handleCheck} />
        <Text style={[isChecked ? styles.textChecked : styles.textUnChecked]}>
          {label}
        </Text>
      </View>
      <TrashButton onPress={removeTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  checked: {
    borderColor: '#7ad772',
    backgroundColor: '#eeffec',
  },
  unChecked: {
    borderColor: '#f3f3f3',
    backgroundColor: '#ffffff',
  },
  textChecked: {
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: '#7ad772',
  },
  textUnChecked: {
    textDecorationLine: 'none',
    color: '#333333',
  },
});
