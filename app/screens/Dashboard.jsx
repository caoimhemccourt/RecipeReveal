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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const feeds = useSelector((state) => state.feeds);
    const navigation = useNavigation()

    const handleNotificationsClick = () => {
      navigation.navigate("Notifications")
    }

    const handleProfileClick = () => {
      navigation.navigate("Profile")
    }

  
    useEffect(() => {
      setIsLoading(true);
  
      try {
        fetchFeeds()
          .then(res => {
            // console.log(res);
            dispatch(SET_FEEDS(res));
            // Assuming res contains the necessary information for success
            // If the fetch is successful, setIsLoading to false after 2000 milliseconds
            setTimeout(() => {
              setIsLoading(false);
              console.log("Feeds from Store:", res)
            }, 2000);
          })
          .catch(error => {
            console.error("Error during fetchFeeds:", error);
            setIsLoading(false); // Set isLoading to false in case of an error
          });
      } catch (error) {
        console.error("Error outside fetchFeeds:", error);
        // setIsLoading(false);
      }
    }, [dispatch]);
  
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
          <MaterialIcons name="person" size={50} color="#555"  />
        </TouchableOpacity>
      </View>

      {/* Scrollable container starts */}

      <ScrollView className= "flex-1 w-auto h-auto">
      {isLoading ? (
         <View className="flex-1 h-60 p-20">
          <ActivityIndicator size={"large"} color={"teal"} />
          </View>
        ) : (
          <Feeds feeds={feeds?.feeds} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard
