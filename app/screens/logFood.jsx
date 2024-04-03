import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Header } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const LogFood = ({ navigation }) => {
  const handleAddNewFood = () => {
    navigation.navigate('NewFoodItem')
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />
      <View className="top-[10%] w-full">
        <View className="items-center rounded-xl bg-[#A6EADD] p-3 ml-2 mr-2" style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
            <Ionicons name="arrow-back-sharp" size={25} color="#555" />
          </TouchableOpacity>
          <Text className="text-[#36454F] text-base font-semibold">Log Food</Text>
        </View>
      </View>
      <View className="p-12" />
      <View className="bg-[#A6EADD] p-2 rounded-xl w-5/6 mb-4">
        <TextInput
          placeholder="Search food..."
          className="text-base"
        // Add onChangeText event handler if needed
        />
      </View>
      <TouchableOpacity onPress={handleAddNewFood} className="bg-[#A6EADD] p-2 rounded-xl w-5/6">
        <Text>Add New Food</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}



export default LogFood