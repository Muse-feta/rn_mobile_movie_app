import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const SearchBar = () => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>
      <TextInput onPress={() => {}} placeholder='Search'
      value='' 
      onChangeText={() => {}}
      placeholderTextColor='#ab8bff'
      className='flex m1-2 px-4'
      />
    </View>
  )
}

export default SearchBar