import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Brand, Screen1 } from '../assets'
import { useNavigation } from '@react-navigation/native'
import { fetchUser, addUser } from '../sanity'


const SignUp = () => {
  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUpClick1 = async() => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return;
    }

    const newUser = {
      name,
      username,
      email,
      password
    };
    try {
      await addUser(newUser);

      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <>
    <View className="flex-1 items-center justify-center bg-[#5FB6A6]">
            <View className="w-56 h-auto flex items-center justify-center p-2 absolute top-10">
                <Image source={Brand} className="w-40 h-32" resizeMode='contain' />
            </View>
    <View className="w-80 h-1/2 flex rounded-md p-2 absolute bg-[#A6EADD]">
        <Text className="text-m font-serif text-center font-medium text-[#36454F] top-1">BECOME A MEMBER</Text>
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Name </Text>
        <TextInput
          value={name}
          onChangeText={setName} 
          className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2" 
          placeholder='Name'
        />
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Username </Text>
        <TextInput          
          value={username}
          onChangeText={setUsername} 
          className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"
          placeholder='Username' 
        />
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Email </Text>
        <TextInput 
          value={email}
          onChangeText={setEmail}
          className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2" 
          placeholder='Email'
        />
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Password </Text>
        <TextInput 
          value={password}
          onChangeText={setPassword}
          className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2" 
          placeholder='Password'
        />
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Confirm Password </Text>
        <TextInput 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"
          placeholder='Confirm Password'
        />
        <Text className="font-light underline text-[#36454F] top-6 text-center">Click here to see Terms and Conditions!</Text>
        <TouchableOpacity className="flex items-center rounded-md p-2 top-10 bg-[#5FB6A6] mr-20 ml-20" onPress={handleSignUpClick1}>
            <Text className="font-bold text-2xl text-[#36454F]">SIGN UP!</Text>
        </TouchableOpacity>
    </View>
    </View>
    </>
  )
}




export default SignUp