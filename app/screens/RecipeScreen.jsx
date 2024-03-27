import { View, Dimensions, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Brand } from '../assets';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToFavorites } from '../sanityAddToFavs';

const RecipeScreen = ({ route }) => {
    const { _id } = route.params;
    const feeds = useSelector((state) => state.feeds);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const navTabHeight = 150

    const screenHeight = Math.round(Dimensions.get("window").height);
    const cardHeight = screenHeight / 2.25


    useEffect(() => {
        setIsLoading(true);
        if (feeds) {
            setData(feeds?.feeds.filter((item) => item._id === _id)[0]);
            setIsLoading(false);
        }
    }, []);

    const handleAddToFavorites = async () => {
        try {
            const userId = await AsyncStorage.getItem('@user_id');
            console.log('userId:', userId);

            if (!userId) {
                throw new Error('Username, password, or userId not found in AsyncStorage');
            }

            await addToFavorites(userId, data._id);
            Alert.alert('Success', 'Recipe added to favorites');
        } catch (error) {
            console.error('Error adding recipe to favorites:', error);
            Alert.alert('Error', 'Failed to add recipe to favorites');
        }
    };

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header />
            <View className="flex-1 items-start justify-start space-y-4 top-20" style={{ paddingBottom: navTabHeight }}>
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
                                        <View>
                                            <Text className="text-base font-semibold text-[#36454F] mb-2">Recipe Type: </Text>
                                            <Text className="text-base text-[#36454F] mb-2">{data?.RecipeType}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-base font-semibold text-[#36454F] mb-2">Preparation Time: </Text>
                                            <Text className="text-base text-[#36454F] mb-2">{data?.PreparationTime}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-base font-semibold text-[#36454F] mb-2">Cooking Time: </Text>
                                            <Text className="text-base text-[#36454F] mb-2">{data?.CookingTime}</Text>
                                        </View>
                                        <Text className="text-base font-semibold text-[#36454F] mb-2">Nutritional Information (g):</Text>
                                        <Text className="text-base text-[#36454F] mb-1">Kcal: {data?.NutritionalInformation?.Kcal}</Text>
                                        <Text className="text-base text-[#36454F] mb-1">Fat: {data?.NutritionalInformation?.Fat}</Text>
                                        <Text className="text-base text-[#36454F] mb-1">Carbs: {data?.NutritionalInformation?.Carbs}</Text>
                                        <Text className="text-base text-[#36454F] mb-1">Protein: {data?.NutritionalInformation?.Protein}</Text>
                                    </View>
                                    <View className="bg-[#A6EADD] rounded-xl p-2 mt-2">
                                        <TouchableOpacity onPress={handleAddToFavorites}>
                                            <View className="flex-row items-center p-1">
                                                <Entypo name="plus" size={18} color="#36454F" />
                                                <Text className="text-base text-[#36454F]">Add to Favorites!</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="bg-[#A6EADD] rounded-xl p-2 mt-2">
                                        <TouchableOpacity>
                                            <View className="flex-row items-center p-1">
                                                <Entypo name="add-to-list" size={18} color="#36454F" />
                                                <Text className="text-base text-[#36454F]">Add Ingredients to Shopping List</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="bg-[#A6EADD] rounded-xl p-2 mt-2">
                                        <TouchableOpacity>
                                            <View className="flex-row items-center p-1">
                                                <Entypo name="star-outlined" size={18} color="#36454F" />
                                                <Text className="text-base text-[#36454F]">Leave a Review</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className="flex-1 ml-2">
                                    <View className="bg-[#A6EADD] rounded-xl p-4">
                                        <Text className="text-base font-semibold text-[#36454F] mb-2">Ingredients:</Text>
                                        {data?.Ingredients.map((ingredient, index) => (
                                            <Text key={index} className="text-base text-[#36454F]">{"\u2022"}{ingredient}</Text>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View className="w-full">
                                <View className="bg-[#A6EADD] rounded-xl p-4">
                                    <Text className="text-xl font-bold text-[#36454F] mb-2">Method:</Text>
                                    {data?.Method.map((method, index) => (
                                        <Text key={index}>
                                            <Text className="text-base font-bold text-[#36454F]">Step {index + 1}: </Text>
                                            <Text className="text-base text-[#36454F]"> {method} </Text>
                                        </Text>
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