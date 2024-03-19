import { View, Dimensions, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Brand } from '../assets';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const RecipeScreen = ({ route }) => {
    const {_id} = route.params;
    const feeds = useSelector((state) => state.feeds);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()

    const screenHeight = Math.round(Dimensions.get("window").height);

    useEffect(() => {
        setIsLoading(true);
        if (feeds) {
          setData(feeds?.feeds.filter((item) => item._id === _id)[0]);
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        }
      }, []);


    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <View className="h-auto flex items-center justify-center p-2 absolute top-10">
                <Image source={Brand} className="w-30 h-32" resizeMode='contain' />
            </View>
            <View className="flex-row items-center justify-between px-4 py-2 w-full">
                <TouchableOpacity>
                    <MaterialIcons name="notifications" size={50} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="person" size={50} color="#555" />
                </TouchableOpacity>
            </View>
        
            <View className="flex-1 items-start justify-start space-y-4">
                {isLoading ? (
                    <View className="w-full flex-1 h-full justify-center">
                        <ActivityIndicator size={"large"} color={"teal"} />
                    </View>
                ) : (
                    <>
                    </>
                )}
            </View>
            
        </SafeAreaView>
  )
}

export default RecipeScreen