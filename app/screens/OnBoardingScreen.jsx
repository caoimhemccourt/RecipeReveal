import { View, Text, Image, ImageBase, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'

import Swiper from 'react-native-swiper'
import { Brand, Screen1 } from '../assets'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage"

const OnBoardingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkOnBoardingStatus = async () => {
            const value = await AsyncStorage.getItem("@onboarding_complete");
            if (value !== null && value === "true") {
            }
        }

        checkOnBoardingStatus();
    }, []);

    const handleLoginClick = async () => {
        try {
            await AsyncStorage.setItem("@onboarding_complete", "true");
            navigation.navigate("Dashboard");
        } catch (error) {
            console.log("Error on storing onboarding status : ", error);
        }
    };

    const handleSignUpClick = () => {
        navigation.navigate("SignUp")
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Swiper showsButtons={false} loop={false}>
                <ScreenOne />
                <ScreenTwo onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick}/>
            </Swiper>
        </View>
    );
};
    


    export const ScreenOne = () => {
        return (
            <View className="flex-1 items-center justify-center bg-[#5FB6A6] relative">
            <View className="w-60 h-60 flex items-center justify-center-top p-2 absolute top-23">
                <Image source={Brand} className="w-40 h-32" resizeMode='contain' />
            </View>
            <Text className="text-xl font-bold text-[#F9F6EE] top-20">Your Taste, Your Rules: </Text>
            <Text className="text-xl font-semibold text-[#F9F6EE] top-20">Enter, Explore, Eat!</Text>
            <Text className="text-xl font-semibold text-[#F9F6EE] top-20">Discover the Perfect Recipe with</Text>
            <Text className="text-xl font-semibold text-[#F9F6EE] top-20">RecipeReveal.</Text>
        </View>
    )
}

export const ScreenTwo = ( {onLoginClick, onSignUpClick} ) => {
    return (
        <View className="flex-1 items-center justify-center bg-[#5FB6A6]">
            <View className="w-56 h-auto flex items-center justify-center p-2 absolute top-20">
                <Image source={Brand} className="w-40 h-32" resizeMode='contain' />
            </View>
            <View className="w-80 h-60 flex rounded-md p-2 absolute bg-[#A6EADD]">
                <Text className="text-m font-serif font-medium text-[#36454F] top-3">Name </Text>
                <TextInput className="w-50 h-70 flex rounded-md p-2 bg-[#5FB6A6] top-3"></TextInput>  
                <Text className="text-m font-serif font-medium text-[#36454F] top-5">Password </Text>
                <TextInput className="w-50 h-50 flex rounded-md p-2 bg-[#5FB6A6] top-5" secureTextEntry={true}></TextInput>
                <Text className="text-m font-light  underline text-[#36454F] top-6">Forgot Password?</Text>
                <TouchableOpacity onPress={onLoginClick}>
                    <Text className="font-bold text-2xl text-[#36454F] top-10 left-24">LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSignUpClick}>
                    <Text className="font-light text-m underline text-[#36454F] top-14 left-10">Not a member yet? Sign up here!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OnBoardingScreen