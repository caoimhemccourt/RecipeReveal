import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Brand, Screen1 } from '../assets'
import { useNavigation } from '@react-navigation/native'


const SignUp = () => {
  const navigation = useNavigation()

  const handleSignUpClick1 = () => {
    navigation.navigate("Dashboard")
  }

  return (
    <>
    <View className="flex-1 items-center justify-center bg-[#5FB6A6]">
            <View className="w-56 h-auto flex items-center justify-center p-2 absolute top-10">
                <Image source={Brand} className="w-40 h-32" resizeMode='contain' />
            </View>
    <View className="w-80 h-1/2 flex rounded-md p-2 absolute bg-[#A6EADD]">
        <Text className="text-m left-20 font-semibold text-[#36454F]">BECOME A MEMBER</Text>
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Name </Text>
        <TextInput className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"></TextInput>  
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Username </Text>
        <TextInput className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"></TextInput>  
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Email </Text>
        <TextInput className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"></TextInput>
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Phone Number </Text>
        <TextInput className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"></TextInput>   
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Password </Text>
        <TextInput className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"></TextInput>  
        <Text className="text-m font-serif font-medium text-[#36454F] top-2">Confirm Password </Text>
        <TextInput className="w-30 h-30 flex rounded-md p-2 bg-[#5FB6A6] top-2"></TextInput>  
        <Text className="font-light underline text-[#36454F] top-6 left-8">Click here to see Terms and Conditions!</Text>
        <TouchableOpacity onPress={handleSignUpClick1}>
            <Text className="font-bold text-2xl text-[#36454F] top-10 left-24">SIGN UP!</Text>
        </TouchableOpacity>
    </View>
    </View>
    </>
  )
}




export default SignUp