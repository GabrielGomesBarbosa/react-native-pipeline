import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';

import TrashIcon from '../assets/images/trash.png';

type TrashButtonProps = {
  onPress?: () => void;
};

export default function TrashButton({onPress}: TrashButtonProps): JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Image source={TrashIcon} style={styles.iconImage} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    height: 32,
    width: 32,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffbaba',
  },
  iconImage: {
    width: 16,
    height: 16,
  },
});
