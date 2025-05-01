import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthField from './AuthField';
import AuthButton from './AuthButton';



const AuthForm = ({ formType, onSubmit }: AuthFormProps) => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  console.log('form', form);
  
  return (
    <View>
      <AuthField placeholder="Enter your email" value={form.email} onChangeText={(text) => setForm({ ...form, email: text })} />
      <AuthField placeholder="Enter your password" value={form.password} onChangeText={(text) => setForm({ ...form, password: text })} secureTextEntry={true}/>
      {formType === 'signup' && <AuthField placeholder='Confirm your password' value={form.confirmPassword} onChangeText={(text) => setForm({ ...form, confirmPassword: text })}/>}

        <AuthButton onPress={() => onSubmit()} label={formType === 'signup' ? 'Sign Up' : 'Sign In'}/>
    </View>
  );
};

export default AuthForm