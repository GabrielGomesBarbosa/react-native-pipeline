import React from 'react';
import {TextInput} from 'react-native';

import {primaryColor} from '../../resources/config.json';

type InputTextProps = {
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function InputText({
  value,
  onChangeText,
}: InputTextProps): JSX.Element {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Type here, and click right button..."
      style={{
        flex: 1,
        borderBottomColor: primaryColor,
        borderBottomWidth: 1,
        fontSize: 13,
        color: '#000',
      }}
      placeholderTextColor={primaryColor}
    />
  );
}
