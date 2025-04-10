import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Tabs } from 'expo-router'

export default class _layout extends Component {
  render() {
    return (
      <Tabs>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        {/* <Tabs.Screen name="saved" options={{ headerShown: false }} />
        <Tabs.Screen name="search" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} /> */}
      </Tabs>
    )
  }
}

const styles = StyleSheet.create({})