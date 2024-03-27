import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Header } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchFavouriteRecipes } from '../sanity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const YourRecipesScreen = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [userId, setUserId] = useState(null); // State to hold userId
  const navTabHeight = 175


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('@user_id');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        } else {
          console.log('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);


  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        if (userId) {
          const response = await fetchFavouriteRecipes(userId);
          if (response && response.length > 0) {
            // Since the response is an array with only one item, we take the first one
            const recipes = response[0].favouriteRecipes;
            console.log('Fetched favourite recipes:', recipes);
            setFavouriteRecipes(recipes || []);
          } else {
            console.log('No favourite recipes found for user ID:', userId);
          }
        } else {
          console.log('User ID not available');
        }
      } catch (error) {
        console.error('Error fetching favourite recipes:', error);
      }
    };

    fetchFavourites();
  }, [userId]);



  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />
      <View className="top-20">
        <View className="bg-[#A6EADD] p-2 rounded-xl">
          <Text className="text-xl font-bold text-center text-[#36454F]">Your Favourite Recipes</Text>
        </View>
        <ScrollView className="w-5/6" style={{ flex: 1 }}>
          <View className="flex-1 mr-2 p-4">
            <View className="bg-[#A6EADD] rounded-xl p-4">
              {favouriteRecipes?.map(recipe => (
                <TouchableOpacity
                  key={recipe._id}>
                      <Image
                      source={{ uri : recipe?.mainImage?.asset?.url }} 
                      resizeMode='contain'
                      className="w-24 h-24 mb-2 mt-1"
                      />
                    <Text className="text-sm font-semibold text-center text-[#36454F]">{recipe.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default YourRecipesScreen;
