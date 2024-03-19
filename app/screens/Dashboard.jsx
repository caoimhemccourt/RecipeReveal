import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Brand } from '../assets';
import { fetchFeeds } from '../sanity';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FEEDS } from '../context/actions/feedsActions';
import { Feeds } from '../components';
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {
  const navigation = useNavigation()

  const handleNotificationsClick = () => {
    navigation.navigate("Notifications")
  }

  const handleProfileClick = () => {
    navigation.navigate("Profile")
  }

  return ( /* This will be the header code that can be used for all pages */
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
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

    </SafeAreaView>
  )
}

export default Dashboard
