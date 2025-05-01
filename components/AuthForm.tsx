import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthField from './AuthField';
import AuthButton from './AuthButton';
import { useAuth } from '@/context/AuthContext';



const AuthForm = ({ formType }: AuthFormProps) => {
    const { session, signIn } = useAuth();
  
    
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  // console.log('form', form);

  const handleSignIn = () => {
    const email = form.email.trim(); 
    const password = form.password
    console.log("Raw email input:", JSON.stringify(email));

     if (!email || !password) {
       console.log("❌ Email and password are required.");
       return;
     }

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(email)) {
         console.log("❌ Invalid email format.");
         return;
       }


    console.log("✅ Attempting sign in:", email);
    signIn({ email, password });
  };
  
  return (
    <View>
      <AuthField placeholder="Enter your email" value={form.email} onChangeText={(text) => setForm({ ...form, email: text })} />
      <AuthField placeholder="Enter your password" value={form.password} onChangeText={(text) => setForm({ ...form, password: text })} secureTextEntry={true}/>
      {formType === 'signup' && <AuthField placeholder='Confirm your password' value={form.confirmPassword} onChangeText={(text) => setForm({ ...form, confirmPassword: text })}/>}

        <AuthButton onPress={() => handleSignIn()} label={formType === 'signup' ? 'Sign Up' : 'Sign In'}/>
    </View>
  );
};

export default AuthForm