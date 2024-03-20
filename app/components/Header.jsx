import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Brand } from '../assets';
import { MaterialIcons } from '@expo/vector-icons';



const Header = () => {
    const navigation = useNavigation()

    const handleNotificationsClick = () => {
        navigation.navigate("Notifications")
    }

    const handleProfileClick = () => {
        navigation.navigate("Profile")
    }

    return (
        <>
            <View className="h-auto flex items-center justify-center p-2 absolute top-10">
                <Image source={Brand} className="w-30 h-32" resizeMode='contain' />
            </View>
            <View className="flex-row items-center justify-between px-4 py-2 w-full">
                <TouchableOpacity onPress={handleNotificationsClick}>
                    <MaterialIcons name="notifications" size={50} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleProfileClick}>
                    <MaterialIcons name="person" size={50} color="#555" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Header