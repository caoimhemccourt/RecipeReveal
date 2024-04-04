import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { fetchCurrentUser, fetchUserShoppingList, searchFood, updateUserShoppingList } from '../sanity'

const ShoppingList = () => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);


  const handleSearch = async () => {
    try {
      const results = await searchFood(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for food:", error);
    }
  }

  const addToShoppingList = async (foodItem) => {
    try {
        const currentUser = await fetchCurrentUser();
        if (currentUser) {
            console.log('Food item to be added:', foodItem);
            const updatedUser = await updateUserShoppingList(currentUser, foodItem);
                setShoppingList(updatedUser.shoppingList);
        } else {
            console.error('Current user is undefined');
        }
    } catch (error) {
        console.error('Error adding to shopping list:', error);
    }
}


  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
      <Header />
      <View className="top-20 w-full">
        <View className="items-center rounded-xl bg-[#A6EADD] p-3 ml-2 mr-2" style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
            <Ionicons name="arrow-back-sharp" size={25} color="#555" />
          </TouchableOpacity>
          <Text className="text-[#36454F] text-base font-semibold">Shopping List</Text>
        </View>
        <View className="p-1" />
        <View className="bg-[#A6EADD] p-2 rounded-xl ml-2 mr-2">
          <TextInput
            placeholder="Search food..."
            className="text-base items-center mb-1 text-[#36454F]"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        {/* Display search results */}
        <View>
          {searchResults.map((foodItem) => (
            <TouchableOpacity key={foodItem.foodID} onPress={() => addToShoppingList(foodItem)}
              className="bg-[#A6EADD] p-2 rounded-xl mt-2 ml-2 mr-2"
            >
              <Text className="text-[#36454F] text-base">{foodItem.product}</Text>
              <Text className="text-[#36454F] text-xs">{foodItem.foodCategory}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ShoppingList