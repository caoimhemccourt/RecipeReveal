import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { addFood, updateUser, fetchUser } from '../sanity';
import { Header } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


const NewFoodItem = ({ navigation }) => {
    const [foodData, setFoodData] = useState({
        product: '',
        foodID: '',
        foodCategory: '',
        price: '',
        quantity: '',
        useBy: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);


    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setFoodData({ ...foodData, useBy: selectedDate });
        }
    };

    const showDatePickerComponent = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerComponent = () => {
        setShowDatePicker(false);
    };

    useEffect(() => {
        // Fetch the current user from AsyncStorage
        const fetchCurrentUser = async () => {
            try {
                const userID = await AsyncStorage.getItem('@user_id');
                const user = await fetchUser(userID);
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);
    const handleAddFood = async () => {
        try {
            // Add food to the food dataset
            const newFood = await addFood(foodData);

            // Ensure currentUser is available
            if (currentUser) {
                // Update the currently logged-in user's loggedFoods array
                const updatedUser = {
                    ...currentUser,
                    loggedFoods: [...currentUser.loggedFoods, { _type: 'reference', _ref: newFood._id }]
                };

                await updateUser(updatedUser);

                // Log the updated user object
                console.log('Updating user with new food:', updatedUser);

                // Update the user in the database
            } else {
                console.error('Error: Current user is not available');
            }

            // Handle successful addition
            console.log('Food added successfully:', newFood);
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            // Handle error
            console.error('Error adding food:', error.message);
        }
    };


    const handleCategorySelect = (category) => {
        setFoodData({ ...foodData, foodCategory: category });
    };

    if (!currentUser) {
        // You can show a loading indicator or return null until the current user is fetched
        return null;
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header />
            <View className="top-24">
                <View className="w-80 h-[76%] flex rounded-xl p-2 bg-[#A6EADD]">
                    <Text className="text-base text-center font-semibold text-[#36454F]">Add New Food Item</Text>
                    {/* Example: */}
                    <TextInput
                        className="w-50 h-70 flex rounded-md p-2 bg-[#5FB6A6] top-2 mb-2"
                        placeholder="Product Name"
                        value={foodData.product}
                        onChangeText={(text) => setFoodData({ ...foodData, product: text })}
                    />
                    <TextInput
                        className="w-50 h-70 flex rounded-md p-2 bg-[#5FB6A6] top-2 mb-2"
                        placeholder={`Price (${foodData.price ? `£${foodData.price}` : '£'})`}
                        value={foodData.price}
                        onChangeText={(text) => {
                            const priceWithoutSymbol = text.replace('£', '');
                            setFoodData({ ...foodData, price: priceWithoutSymbol });
                        }}
                    />
                    <TextInput
                        className="w-50 h-70 flex rounded-md p-2 bg-[#5FB6A6] top-2 mb-2"
                        placeholder="Quantity"
                        value={foodData.quantity.toString()}
                        onChangeText={(text) => setFoodData({ ...foodData, quantity: parseFloat(text) })}
                        keyboardType="numeric"
                    />
                    <View>
                        <TouchableOpacity
                            className="w-50 h-70 flex rounded-md p-2 bg-[#5FB6A6] top-2 mb-2"
                            onPress={showDatePickerComponent}
                        >
                            <Text className="text-[#36454F] opacity-40">{foodData.useBy ? foodData.useBy.toDateString() : 'Select Use By Date'}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <View>
                                <DateTimePicker
                                    value={foodData.useBy || new Date()}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleDateChange}
                                />
                                <TouchableOpacity onPress={hideDatePickerComponent}>
                                    <Text className="text-sm text-center text-[#36454F]">Close</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View>
                        <View className="p-4 mt-4 items-center">
                            <Text className="text-base font-semibold text-[#36454F]">Select Food Category:</Text>
                            <View className="flex-row flex-wrap-reverse p-2">
                                {['FruitAndVeg', 'Cupboard', 'Bread', 'DairyAndEggs', 'PoultryAndFish'].map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        style={{
                                            backgroundColor: foodData.foodCategory === category ? '#5FB6A6' : 'transparent',
                                            padding: 5,
                                            borderRadius: 5,
                                            marginTop: 5,
                                            marginRight: 10,
                                        }}
                                        onPress={() => handleCategorySelect(category)}
                                    >
                                        <Text style={{ color: foodData.foodCategory === category ? '#36454F' : '#36454F' }}>
                                            {category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        {/* Button to add food */}
                        <TouchableOpacity className="flex items-center rounded-md p-2 bg-[#5FB6A6] mr-20 ml-20" onPress={handleAddFood}>
                            <Text className="text-base font-semibold text-[#36454F]">Add Food</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewFoodItem;