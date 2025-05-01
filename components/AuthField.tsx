import { View, Text, TextInput } from 'react-native'
import React from 'react'



const AuthField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: AuthFieldProps) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        className="border border-gray-500 rounded-full p-4 text-white my-2"
      />
    </>
  );
};

export default AuthField