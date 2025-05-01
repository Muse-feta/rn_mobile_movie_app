import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'



const AuthButton = ({onPress, label}: AuthButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-accent rounded-full py-4 mt-2"
    >
      <Text className="text-secondary text-base font-semibold text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default AuthButton