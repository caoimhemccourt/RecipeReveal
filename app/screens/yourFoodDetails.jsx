import { View, Text, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '../components';
import { fetchFood, updateFood } from '../sanity';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const YourFoodDetails = ({ route }) => {
  const { _id } = route.params;
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editedData, setEditedData] = useState(null); // State to hold edited data
  const navigation = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodData = await fetchFood(); // Fetch food data
        console.log('Fetched food data:', foodData); // Log fetched data
        const selectedData = foodData.find(item => item._id === _id);
        setData(selectedData); // Set initial data
        setEditedData(selectedData); // Set edited data to initial data
      } catch (error) {
        console.error('Error fetching food data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data (inside finally block)
      }
    };

    fetchData();
  }, [_id]);

  const handleInputChange = (key, value) => {
    setEditedData(prevData => ({ ...prevData, [key]: value }));
  };


  const handleSubmit = async () => {
    try {
      await updateFood(editedData); // Call your updateFood function passing the editedData
      console.log('Food data updated successfully:', editedData);
      setData(editedData); // Update displayed data with edited data
      Alert.alert(
        'Success',
        'Food data updated successfully',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      )
    } catch (error) {
      console.error('Error updating food data:', error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#5FB6A6' }}>
      <Header />
      <View style={{ flex: 1, paddingTop: 20 }}>
        {isLoading ? (
          <View style={{ top: 20, height: 60, padding: 20 }}>
            <ActivityIndicator size="large" color="teal" />
          </View>
        ) : data ? (
          <ScrollView style={{ marginTop: '18%' }}>
            <View style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}>
              <View style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
                  <Ionicons name="arrow-back-sharp" size={25} color="#555" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#36454F', textAlign: 'center' }}>{data.foodCategory}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}>
              <Text className="text-sm text-[#36454F] left-1">Product:</Text>
              <TextInput
                className="text-base text-[#36454F] rounded-xl p-2 bg-[#A6EADD]"
                value={editedData.product}
                onChangeText={text => handleInputChange('product', text)}
                placeholder='...'
              />
            </View>
            <View style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}>
              <Text className="text-sm text-[#36454F] left-1">Quantity:</Text>
              <TextInput
                className="text-base text-[#36454F] rounded-xl p-2 bg-[#A6EADD]"
                value={editedData.quantity}
                onChangeText={text => handleInputChange('quantity', text)}
                placeholder='0'
              />
            </View >
            <Text className="text-sm text-[#36454F] left-2">Price:</Text>
            <View style={{ backgroundColor: '#A6EADD', borderRadius: 10, marginBottom: 8, flexDirection: 'row', alignItems: 'center', marginLeft: 8, marginRight: 8 }}>
              <Text className="text-base text-[#36454F] rounded-xl bg-[#A6EADD]">£</Text>
              <TextInput
                className="text-base text-[#36454F] rounded-xl p-2 bg-[#A6EADD]"
                value={editedData.price}
                onChangeText={text => handleInputChange('price', text.replace('£', ''))}
                keyboardType="numeric" // To restrict input to numeric characters
                placeholder='£0.00'
              />
            </View>
            <View style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}>
              <Text className="text-sm text-[#36454F] left-1">Use By Date:</Text>
              <TextInput
                className="text-base text-[#36454F] rounded-xl p-2 bg-[#A6EADD]"
                value={editedData.useBy}
                onChangeText={text => handleInputChange('useBy', text)}
                placeholder='DD/MM/YYYY'
              />
            </View>
            <TouchableOpacity className="flex items-center rounded-xl p-2 top-5 bg-[#A6EADD] mr-20 ml-20" onPress={handleSubmit}>
              <Text className="font-bold text-2xl text-[#36454F]">Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default YourFoodDetails