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

    const screenHeight = Math.round(Dimensions.get("window").height);

    useEffect(() => {
        setIsLoading(true);
        if (feeds) {
            setData(feeds?.feeds.filter((item) => item._id === _id)[0]);
            setIsLoading(false);
        }
    }, []);


    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header/>
                <View className="flex-1 items-start justify-start space-y-4">
                    {isLoading ? (
                        <View className="flex-1 h-60 p-20">
                            <ActivityIndicator size={"large"} color={"teal"} />
                        </View>
                    ) : (
                        <>
                            <ScrollView>
                                <View className="rounded-xl items-center justify-center relative bg-[#A6EADD] flex top-[8%]"
                                    style={{ height: screenHeight / 2.5, width: 300, padding: 40 }}
                                >
                                    <Image
                                        source={{ uri: data?.mainImage?.asset?.url }}
                                        resizeMode='contain'
                                        className="w-32 h-48 mb-2"
                                    />
                                    <View className="space-y-1 w-full mb-2 items-center">
                                        <Text className="text-base font-semibold text-[#36454F]">{data?.title}</Text>
                                    </View>

                                    <View className="space-y-1 w-full">
                                        <Text className="text-sm text-[#36454F]">{data?.Description}</Text>
                                    </View>
                                </View>
                                <View className="rounded-xl items-center justify-center relative bg-[#A6EADD] flex-row top-[34%]"
                                    style={{ height: 350, width: 300, padding: 20 }}
                                >
                                    {/* LEFT COLUMN */}
                                    <View className="flex-1 p-2">
                                        <View className="space-y-1 w-full p-1">
                                            <Text className="text-sm text-[#36454F]">Recipe Type: {data?.RecipeType}</Text>
                                        </View>
                                        <View className="space-y-1 w-full p-1">
                                            <Text className="text-sm text-[#36454F]">Preparation Time: {data?.PreparationTime}</Text>
                                        </View>
                                        <View className="space-y-1 w-full p-1">
                                            <Text className="text-sm text-[#36454F]">Cooking Time: {data?.CookingTime}</Text>
                                        </View>
                                        <View className="space-y-1 w-full p-1">
                                            <Text className="text-sm text-[#36454F]">Nutritional Information: {data?.NutritionalInformation}</Text>
                                        </View>
                                    </View>

                                    {/* RIGHT COLUMN */}
                                    <View className="flex-1">
                                        <View className="space-y-1 w-full">
                                            <Text className="text-sm text-[#36454F]">Ingredients: </Text>
                                            <View>
                                                {data?.Ingredients.map((ingredient, index) => (
                                                    <View key={index} className="w-full">
                                                        <Text className="text-sm text-[#36454F]">
                                                            {ingredient}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* METHODS */}
                                <View className="rounded-xl items-center justify-center relative bg-[#A6EADD] flex-row top-[40%]"
                                    style={{ height: 425, width: 300, padding: 40 }}
                                >
                                    <View className="flex-1 p-1">
                                        <View className="space-y-1 w-full">
                                            <Text className="text-m text-[#36454F] font-medium">Method: </Text>
                                            <View>
                                                {data?.Method.map((method, index) => (
                                                    <View key={index} className="w-full">
                                                        <Text className="text-sm text-[#36454F]">
                                                            {method}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
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