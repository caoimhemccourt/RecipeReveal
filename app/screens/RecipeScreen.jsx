import { View, Dimensions, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Brand } from '../assets';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components';

const RecipeScreen = ({ route }) => {
    const { _id } = route.params;
    const feeds = useSelector((state) => state.feeds);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const navTabHeight = 160

    const screenHeight = Math.round(Dimensions.get("window").height);
    const cardHeight = screenHeight / 2.25


    useEffect(() => {
        setIsLoading(true);
        if (feeds) {
            setData(feeds?.feeds.filter((item) => item._id === _id)[0]);
            setIsLoading(false);
        }
    }, []);


    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header />
            <View className="flex-1 items-start justify-start space-y-4 top-24" style={{ paddingBottom: navTabHeight, paddingTop: '200' }}>
                {isLoading ? (
                    <View className="flex-1 h-60 p-20">
                        <ActivityIndicator size={"large"} color={"teal"} />
                    </View>
                ) : (
                    <>
                        <ScrollView className="w-5/6" style={{ flex: 1 }}>
                            <View className="w-full mb-4">
                                <View className="bg-[#A6EADD] rounded-xl p-4">
                                    {data?.mainImage?.asset?.url && (
                                        <View className="p-4">
                                            <Image
                                                source={{ uri: data?.mainImage?.asset?.url }}
                                                resizeMode='contain'
                                                style={{ width: '100%', aspectRatio: 16 / 8 }}
                                            />
                                        </View>
                                    )}
                                    <Text className="text-xl font-bold text-center text-[#36454F]">{data?.title}</Text>
                                    <Text className="text-base text-center text-[#36454F] mt-2">{data?.Description}</Text>
                                </View>
                            </View>
                            <View className="flex-row w-full mb-4">
                                <View className="flex-1 mr-2">
                                    <View className="bg-[#A6EADD] rounded-xl p-4">
                                        <Text className="text-base text-[#36454F] mb-2">Recipe Type: {data?.RecipeType}</Text>
                                        <Text className="text-base text-[#36454F] mb-2">Preparation Time: {data?.PreparationTime}</Text>
                                        <Text className="text-base text-[#36454F] mb-2">Cooking Time: {data?.CookingTime}</Text>
                                        <Text className="text-base text-[#36454F] mb-2">Nutritional Information: {data?.NutritionalInformation}</Text>
                                    </View>
                                </View>
                                <View className="flex-1 ml-2">
                                    <View className="bg-[#A6EADD] rounded-xl p-4">
                                        <Text className="text-base text-[#36454F] mb-2">Ingredients:</Text>
                                        {data?.Ingredients.map((ingredient, index) => (
                                            <Text key={index} className="text-base text-[#36454F]">{ingredient}</Text>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View className="w-full">
                                <View className="bg-[#A6EADD] rounded-xl p-4">
                                    <Text className="text-xl font-bold text-[#36454F] mb-2">Method:</Text>
                                    {data?.Method.map((method, index) => (
                                        <Text key={index} className="text-base text-[#36454F]">{method}</Text>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

export default RecipeScreen