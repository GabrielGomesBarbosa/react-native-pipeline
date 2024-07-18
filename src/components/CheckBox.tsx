import React from 'react';
import {View, Pressable, StyleSheet, Image} from 'react-native';

import CheckedGrey from '../assets/images/checked-grey.png';
import CheckedWhite from '../assets/images/checked-white.png';

type CheckBoxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function CheckBox({checked, onChange}: CheckBoxProps) {
  const handleCheck = () => {
    onChange?.(!checked);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.pressable,
          checked ? styles.pressableChecked : styles.pressableUnchecked,
        ]}
        onPress={handleCheck}>
        <Image
          source={checked ? CheckedWhite : CheckedGrey}
          style={styles.checkImage}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pressable: {
    height: 32,
    width: 32,
    borderWidth: 1,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableChecked: {
    backgroundColor: '#79d771',
    borderColor: '#fff',
  },
  pressableUnchecked: {
    backgroundColor: '#fff',
    borderColor: '#f3f3f3',
  },
  checkImage: {
    width: 16,
    height: 16,
  },
});
