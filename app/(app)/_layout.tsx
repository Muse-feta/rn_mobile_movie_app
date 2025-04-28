import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const _layout = () => {
    const { session } = useAuth();
  return !session ? <Redirect href="/" /> : <Redirect href="/" />;
}

export default _layout