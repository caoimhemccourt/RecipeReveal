import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const FeedsDetail = ({data}) => {
    const screenHeight = Math.round(Dimensions.get("window").height);
    const cardHeight = screenHeight / 2.5

    const navigation = useNavigation()

      const handleClick = () => {
          navigation.navigate("RecipeScreen", {_id : data?._id});
      }

    
  return (
    <TouchableOpacity onPress={handleClick} className="p-10 m-2 rounded-xl bg-[#A6EADD] flex items-center justify-center " 
    style={ { height: cardHeight, flexDirection: 'column'} }
    >
      <Image 
        source={{ uri : data?.mainImage?.asset?.url }} 
        resizeMode='contain' 
        className="w-32 h-52"
      />
      <View className="flex items-start justify-start space-y-1 w-full">
        <Text className="text-base font-semibold text-[#36454F]">{ data?.title }</Text>
      </View>

      <View className="flex items-start justify-start space-y-1 w-full h-10">
        <Text className="text-sm text-[#36454F]">{ data?.Description }</Text>
      </View>


      <TouchableOpacity className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
        <AntDesign name="heart" size={16} color={'#850101'}/>
      </TouchableOpacity>

    </TouchableOpacity>
  )
}

export default FeedsDetail