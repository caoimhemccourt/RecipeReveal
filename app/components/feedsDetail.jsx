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
    <TouchableOpacity onPress={handleClick} className="rounded-xl items-center bg-[#A6EADD] flex ml-2 mb-2" 
    style={{ height: cardHeight / 2.4, width: 125}}
    >
      <Image 
        source={{ uri : data?.mainImage?.asset?.url }} 
        resizeMode='contain' 
        className="w-24 h-24 mb-2 mt-1"
      />
      <View className="space-y-1 w-full mb-2 items-center">
        <Text className="text-sm font-semibold text-center text-[#36454F]">{ data?.title }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FeedsDetail