import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Header } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchFavouriteRecipes } from '../sanity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const YourRecipesScreen = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [userId, setUserId] = useState(null); // State to hold userId
  const navigation = useNavigation()



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

  const handleRecipeClick = (_id) => {
    navigation.navigate('RecipeScreen', { _id });
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#5FB6A6' }}>
      <Header />
      <View className="top-[10%] w-full">
        <View className="items-center rounded-xl bg-[#A6EADD] p-3 ml-2 mr-2" style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
            <Ionicons name="arrow-back-sharp" size={25} color="#555" />
          </TouchableOpacity>
          <Text className="text-[#36454F] text-base font-semibold">Your Recipes</Text>
        </View>
      </View>
      <ScrollView className="top-20" contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
        {favouriteRecipes.map(recipe => (
          <TouchableOpacity key={recipe._id} onPress={() => handleRecipeClick(recipe._id)} style={{ width: '48%', marginBottom: 16 }}>
            <View style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12 }}>
              <Image
                source={{ uri: recipe?.mainImage?.asset?.url }}
                resizeMode='contain'
                style={{ width: '100%', height: 120, marginBottom: 8 }}
              />
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#36454F', textAlign: 'center' }}>{recipe.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


export default YourRecipesScreen;
