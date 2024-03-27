import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Header } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'

const LogFood = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />
      <View className="top-20 w-[90%]">
        <View className="bg-[#A6EADD] p-1 rounded-xl">
          <Text className="text-xl font-bold text-center text-[#36454F]">Log Food</Text>
        </View>
        <View className="p-2" />
        <View className="bg-[#A6EADD] p-2 rounded-xl">
          <TextInput
            placeholder="Search food..."
            className="text-base"
          // Add onChangeText event handler if needed
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LogFood