import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Brand } from '../assets';
import { fetchFeeds } from '../sanity';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FEEDS } from '../context/actions/feedsActions';
import { Feeds, Header } from '../components';
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />

    </SafeAreaView>
  )
}

export default Dashboard
