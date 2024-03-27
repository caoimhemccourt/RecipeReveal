import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


const FoodDetail = ({ data }) => {
    const screenHeight = Math.round(Dimensions.get("window").height);
    const cardHeight = screenHeight / 4


  return (
    <TouchableOpacity className="rounded-xl items-center bg-[#A6EADD] shadow-lg opacity-75 flex ml-3 mr-3 mb-2"
    style = {{ height: 50 }}
    >
      <View className="space-y-1 w-full mt-1 ml-4">
        <Text className="text-sm font-semibold text-[#36454F]">{ data?.product }</Text>
        <Text className="text-sm text-[#36454F]">{ data?.useBy }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FoodDetail