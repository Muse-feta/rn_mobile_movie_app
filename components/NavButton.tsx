import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const NavButton = ({buttonType, label, onPress} : NavButtonProps) => {
  return (
    <View>
        <TouchableOpacity
                    className={`${buttonType === "primary" ? " flex-1" : ""} bg-accent rounded-full py-3.5 px-8 mt-5`}
                    onPress={onPress}
                  >
                    <Text className=" text-secondary text-base  font-semibold ml-2 text-center">
                      {label}
                    </Text>
        </TouchableOpacity>
    </View>
  )
}

export default NavButton