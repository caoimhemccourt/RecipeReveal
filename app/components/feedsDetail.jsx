import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const FeedsDetail = ({ data }) => {
    const screenHeight = Math.round(Dimensions.get("window").height);
    const cardHeight = screenHeight / 2.3

    const navigation = useNavigation()

      const handleClick = () => {
          navigation.navigate("RecipeScreen", {_id : data?._id});
      }

    
  return (
    <TouchableOpacity onPress={handleClick} className="rounded-xl items-center bg-[#A6EADD] flex" 
    style={{ height: cardHeight, width: 300, marginVertical: 10}}
    >
      <Image 
        source={{ uri : data?.mainImage?.asset?.url }} 
        resizeMode='contain' 
        className="w-32 h-48 mb-2 p-2"
      />
      <View className="space-y-1 w-full mb-2 items-center">
        <Text className="text-base font-semibold text-[#36454F]">{ data?.title }</Text>
      </View>

      <View className="space-y-1 w-full h-auto p-2">
        <Text className="text-sm text-[#36454F] text-center">{ data?.Description }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FeedsDetail