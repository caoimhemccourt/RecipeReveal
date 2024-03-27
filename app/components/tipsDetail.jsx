import { View, Text, Dimensions, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'

const TipsDetail = ({ data }) => {
    const screenHeight = Math.round(Dimensions.get("window").height);
    const cardHeight = screenHeight / 3
    const cardWidth = Dimensions.get("window").width / 2 - 20;

    const openLink = () => {
        Linking.openURL(data.link)
            ;
    }

    return (
        <TouchableOpacity onPress={openLink}>
            <View className="p-1"
                style={{ flexDirection: 'row' }}>
                <View className="rounded-xl items-center bg-[#A6EADD]"
                    style={{ height: cardHeight, width: cardWidth, marginRight: 10 }}>
                    <Image
                        source={{ uri: data?.mainImage?.asset?.url }}
                        resizeMode='contain'
                        className="w-32 h-44 mb-1"
                    />
                    <View className="space-y-1 w-full h-auto p-2">
                        <Text className="text-sm font-semibold text-[#36454F] text-center">{data?.title}</Text>
                        <Text className="text-sm text-[#36454F] text-center">Click here to find out more!</Text>
                    </View>
                </View>

                <View className="rounded-xl items-center bg-[#A6EADD] flex"
                    style={{ height: cardHeight, width: cardWidth, marginRight: 10 }}>
                    <Image
                        source={{ uri: data?.mainImage?.asset?.url }}
                        resizeMode='contain'
                        className="w-32 h-44 mb-1"
                    />
                    <View className="space-y-1 w-full h-auto p-2">
                        <Text className="text-sm font-semibold text-[#36454F] text-center">{data?.title}</Text>
                        <Text className="text-sm text-[#36454F] text-center">Click here to find out more!</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TipsDetail