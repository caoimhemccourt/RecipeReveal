import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { Brand, Screen1 } from '../assets'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
    const navigation = useNavigation()

    const handleBackClick = () => {
        navigation.navigate("Dashboard")
    }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <View className="h-auto flex items-center justify-center p-2 absolute top-10">
                <Image source={Brand} className="w-30 h-32" resizeMode='contain' />
      </View>
      <View className="flex-row items-center justify-between px-4 py-2 w-full">
        <TouchableOpacity onPress={handleBackClick}>
          <Ionicons name="arrow-back-sharp" size={50} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="person" size={50} color="#555"  />
        </TouchableOpacity>
      </View>

      <View className="items-center top-20">
        <MaterialIcons name="notifications" size={75} color="#555"/>
        <Text className="font-semibold">NO NOTIFICATIONS</Text>
      </View>
    </SafeAreaView>
  )
}

export default Notifications