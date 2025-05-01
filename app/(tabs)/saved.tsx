import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { router } from 'expo-router'

const saved = () => {
  return (
    <View className=" bg-primary flex-1  p-10">
      <View className=" flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className=" size-10" tintColor="#fff" />
        <Text className=" text-gray-500 text-base text-center">
          Sign in to access your personalized experience, or sign up now to
          create a new account and explore all the features we offer.
        </Text>

        <View className=" flex flex-row gap-x-5">
          <TouchableOpacity
            className="flex-1 bg-accent rounded-full py-3.5 px-8 mt-5"
            onPress={() => router.push("/signin")}
          >
            <Text className=" text-secondary text-base  font-semibold ml-2 text-center">
              SignIn
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-accent rounded-full py-3.5 px-8 mt-5"
            onPress={() => router.push("/signup")}
          >
            <Text className=" text-secondary text-base  font-semibold ml-2 text-center">
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default saved

const styles = StyleSheet.create({})