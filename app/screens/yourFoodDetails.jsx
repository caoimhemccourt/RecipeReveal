import { View, Text, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView, TextInput } from 'react-native'
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
    } catch (error) {
      console.error('Error updating food data:', error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'start', backgroundColor: '#5FB6A6' }}>
      <Header />
      <View style={{ flex: 1, paddingTop: 20 }}>
        {isLoading ? (
          <View style={{ flex: 1, height: 60, padding: 20 }}>
            <ActivityIndicator size="large" color="teal" />
          </View>
        ) : data ? (
          <ScrollView style={{ marginTop: '18%' }}>
            <View style={{ marginBottom: 4 }}>
              <View style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-24">
                  <Ionicons name="arrow-back-sharp" size={25} color="#555" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#36454F', textAlign: 'center' }}>{data.foodCategory}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 4 }}>
              <TextInput
                style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12, fontSize: 20 }}
                value={editedData.product}
                onChangeText={text => handleInputChange('product', text)}
              />
            </View>
            <View style={{ marginBottom: 4 }}>
              <TextInput
                style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12, fontSize: 20 }}
                value={editedData.quantity}
                onChangeText={text => handleInputChange('product', text)}
              />
            </View>
            <View style={{ marginBottom: 4 }}>
              <TextInput
                style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12, fontSize: 20 }}
                value={editedData.price}
                onChangeText={text => handleInputChange('product', text)}
              />
            </View>
            <View style={{ marginBottom: 4 }}>
              <TextInput
                style={{ backgroundColor: '#A6EADD', borderRadius: 10, padding: 12, fontSize: 20 }}
                value={editedData.useBy}
                onChangeText={text => handleInputChange('product', text)}
              />
            </View>
            <TouchableOpacity className="bg-[#A6EADD]" onPress={handleSubmit}>
            <Text>Submit</Text>
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