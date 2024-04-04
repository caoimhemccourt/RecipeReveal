import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { fetchCurrentUser, searchFood, updateUserLoggedFoods, updateUserDocument } from '../sanity'

const LogFood = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    // Fetch current user data when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleSearchFood = async () => {
    try {
      const results = await searchFood(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for food:', error)
    }
  }

  const handleAddFoodToUser = async (foodItem) => {
    try {
      if (!currentUser) {
        console.error('Current user data is null or undefined');
        return;
      }
      console.log('Food item before adding to user:', foodItem); // Add this console log

      // Add the food item to the user's loggedFoods array
      await updateUserLoggedFoods(currentUser, foodItem);
      console.log('Food added to user successfully');

      // Update user document after adding logged food
      const updatedUser = { ...currentUser, loggedFoods: [...currentUser.loggedFoods, foodItem] };
      await updateUserDocument(currentUser._id, updatedUser);
      console.log('User document updated successfully');

      Alert.alert('Food Logged', 'The food has been successfully logged.');

    } catch (error) {
      console.error('Error adding food to user:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAddFoodToUser(item)}>
      <Text>{item.product}</Text>
      {/* Display other relevant information about the food item */}
    </TouchableOpacity>
  );

  const handleAddNewFood = () => {
    navigation.navigate('NewFoodItem')
  }

  return (
    <SafeAreaView className="flex-1 items-center bg-[#5FB6A6]">
      <Header />
      <View className="top-[10%] w-full">
        <View className="items-center rounded-xl bg-[#A6EADD] p-3 ml-2 mr-2" style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
            <Ionicons name="arrow-back-sharp" size={25} color="#555" />
          </TouchableOpacity>
          <Text className="text-[#36454F] text-base font-semibold">Log Food</Text>
        </View>
      </View>
      <View className="p-12" />
      <TouchableOpacity onPress={handleAddNewFood} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#A6EADD', borderRadius: 10, padding: 10, marginBottom: 10, width: '95%' }}>
        <Text style={{ color: '#36454F', fontSize: 16 }}>Add New Food</Text>
        <MaterialIcons name="add" size={24} color="#36454F" />
      </TouchableOpacity>
      <View style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 10, marginBottom: 10, width: '95%' }}>
        <TextInput
          placeholder="Search food..."
          style={{ fontSize: 16 }}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearchFood}
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Assuming _id is the unique identifier for food items
        style={{ width: '95%' }}
      />
    </SafeAreaView>
  );
};

export default LogFood;