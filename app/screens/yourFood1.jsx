import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchFood } from '../sanity';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FOOD } from '../context/actions/foodActions';
import { Header, FoodDetail } from '../components';
import { useNavigation } from '@react-navigation/native';


const YourFood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFoodCategory, setExpandedFoodCategory] = useState(null); // State for expanded food category
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.food);
  const food = foodData ? foodData.food : []; // Null check for food
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);

    try {
      fetchFood()
        .then(res => {
          dispatch(SET_FOOD(res));
          setTimeout(() => {
            setIsLoading(false);
            console.log("Food from Store:", res)
          }, 2000);
        })
        .catch(error => {
          console.error("Error during fetchFood:", error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error outside fetchFood:", error);
    }
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />
      <View className="top-[10%] w-full">
        <View className="items-center rounded-xl bg-[#A6EADD] p-3 ml-2 mr-2" style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
            <Ionicons name="arrow-back-sharp" size={25} color="#555" />
          </TouchableOpacity>
          <Text className="text-[#36454F] text-base font-semibold">Your Food</Text>
        </View>
        <View className="p-2" />
        {foodCategories.map(foodCategory => (
          <View key={foodCategory.value}>
            {/* Recipe type header */}
            <TouchableOpacity
              onPress={() => setExpandedFoodCategory(expandedFoodCategory === foodCategory.value ? null : foodCategory.value)}
              style={{ backgroundColor: '#A6EADD', padding: 10, marginBottom: 10, borderRadius: 10, marginRight: 10, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text className="text-[#36454F] font-semibold" >{foodCategory.title}</Text>
              <MaterialIcons name={expandedFoodCategory === foodCategory.value ? 'expand-less' : 'expand-more'} size={24} color='#36454F' />
            </TouchableOpacity>

            {/* Recipes section */}
            {expandedFoodCategory === foodCategory.value && (
              <ScrollView>
                {food.filter(food => food.foodCategory === foodCategory.value).map(food => (
                  <FoodDetail key={food._id} data={food} />
                ))}
              </ScrollView>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default YourFood;

const foodCategories = [
  { title: 'Fruit And Veg', value: 'FruitAndVeg' },
  { title: 'Cupboard', value: 'Cupboard' },
  { title: 'Bread', value: 'Bread' },
  { title: 'Dairy And Eggs', value: 'DairyAndEggs' },
  { title: 'Poultry And Fish', value: 'PoultryAndFish' },
];