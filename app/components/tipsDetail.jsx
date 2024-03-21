import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const TipsDetail = ({ data }) => {
    const screenHeight = Math.round(Dimensions.get("window".height));
    const cardHeight = screenHeight / 2.5
    
    return(
        <View className="rounded-xl items-center bg-[#A6EADD] flex"
        style={{ height: cardHeight, width: 300 }}>
            <Image
                source={{ uri: data?.mainImage?.asset?.url }}
                resizeMode='contain'
                className="w-32 h-48 mb-2 p-2"
            />
            <View className="space-y-1 w-full h-auto p-2">
                <Text className="text-sm text-[#36454F]">{ data?.title }</Text>
            </View>
            <View className="space-y-1 w-full h-auto p-2">
                <Text className="text-sm text-[#36454F]">{ data?.link }</Text>
            </View>
        </View>
    )
}

export default TipsDetail