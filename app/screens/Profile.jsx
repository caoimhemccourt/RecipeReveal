import { View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Brand, Screen1 } from '../assets'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation()

    const handleBackClick1 = () => {
        navigation.navigate("Dashboard")
    }

    const handleLogOutClick = () => {
        navigation.navigate("OnBoarding")
    }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <View className="h-auto flex items-center justify-center p-2 absolute top-10">
                <Image source={Brand} className="w-30 h-32" resizeMode='contain' />
      </View>
      <View className="flex-row items-center justify-between px-4 py-2 w-full">
      <TouchableOpacity>
          <MaterialIcons name="notifications" size={50} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBackClick1}>
            <Ionicons name="arrow-back-sharp" size={50} color="#555" />
        </TouchableOpacity>
      </View>

      <View className="items-center top-16">
        <MaterialIcons name="person" size={75} color="#555"/>
        <Text className="underline text-m font-serif font-medium text-[#36454F]">Click here to Update Profile Photo!</Text>
      </View>
      <View className="w-80 h-72 flex rounded-md absolute bg-[#A6EADD] top-[37%]">
        <Text className="text-m font-serif font-medium text-[#36454F] underline left-24 p-1">User Dashboard</Text>
        <Text className="text-m font-serif font-medium text-[#36454F] p-1">Weekly Food Waste Cost:</Text>
        <AntDesign name='barschart' size={124} color="#555" />
        <Text className="text-m font-serif font-medium text-[#36454F] p-1">Recipes Used:</Text>
        <Text className="text-4xl font-serif font-bold text-[#36454F] p-1">3</Text>
      </View>
      <View className="w-80 h-46 flex rounded-md absolute bg-[#A6EADD] top-[76%]">
        <TouchableOpacity className="flex-row items-center justify-right content-between p-1">
            <Text className="text-m font-serif font-medium text-[#36454F]">Update Profile Information:</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={"#555"}/>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-right content-between p-1">
            <Text className="text-m font-serif font-medium text-[#36454F]">App Tutorials:</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={"#555"}/>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-right content-between p-1">
            <Text className="text-m font-serif font-medium text-[#36454F]">Help:</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={"#555"}/>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-right content-between p-1">
            <Text className="text-m font-serif font-medium text-[#36454F]">Terms and Conditions:</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={"#555"}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOutClick} className="flex-row items-center justify-right content-between p-1">
            <Text className="text-m font-serif font-medium text-[#36454F]">Log Out:</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={"#555"}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile