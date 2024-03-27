import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../components';

const Food = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />
      {/* Mini Menu */}
      <View className="top-40 flex-col w-80">
        <View className="bg-[#A6EADD] rounded-xl p-4 mb-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('YourFood')}>
            <Text className="text-base text-center font-semibold text-[#36454F]">Your Food</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-[#A6EADD] rounded-xl p-4 mb-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('LogFood')}>
            <Text className="text-base text-center font-semibold text-[#36454F]">Log Food</Text>
          </TouchableOpacity>
          </View>
          <View className="bg-[#A6EADD] rounded-xl p-4 mb-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('ShoppingList')}>
            <Text className="text-base text-center font-semibold text-[#36454F]">Shopping List</Text>
          </TouchableOpacity>
          </View>
          <View className="bg-[#A6EADD] rounded-xl p-4 mb-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('YourRecipes')}>
            <Text className="text-base text-center font-semibold text-[#36454F]">Your Recipes</Text>
          </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default Food;