import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchFeeds } from '../sanity';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FEEDS } from '../context/actions/feedsActions';
import { Feeds, FeedsDetail, Header } from '../components';
import { useNavigation } from '@react-navigation/native';


const Recipes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRecipeType, setExpandedRecipeType] = useState(null); // State for expanded recipe type
    const dispatch = useDispatch();
    const feedsData = useSelector((state) => state.feeds);
    const feeds = feedsData ? feedsData.feeds : []; // Null check for feeds
    const navigation = useNavigation();

    useEffect(() => {
        setIsLoading(true);

        try {
            fetchFeeds()
                .then(res => {
                    dispatch(SET_FEEDS(res));
                    setTimeout(() => {
                        setIsLoading(false);
                        console.log("Feeds from Store:", res)
                    }, 2000);
                })
                .catch(error => {
                    console.error("Error during fetchFeeds:", error);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error("Error outside fetchFeeds:", error);
        }
    }, [dispatch]);

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header />
            <View className="top-[10%] w-full">
                {recipeTypes.map(recipeType => (
                    <View key={recipeType.value}>
                        {/* Recipe type header */}
                        <TouchableOpacity
                            onPress={() => setExpandedRecipeType(expandedRecipeType === recipeType.value ? null : recipeType.value)}
                            style={{ backgroundColor: '#A6EADD', padding: 10, marginBottom: 10, borderRadius: 10, marginRight: 10, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'  }}
                        >
                            <Text className="text-[#36454F] font-semibold" >{recipeType.title}</Text>
                            <MaterialIcons name={expandedRecipeType === recipeType.value ? 'expand-less' : 'expand-more'} size={24} color='#36454F' />
                        </TouchableOpacity>

                        {/* Recipes section */}
                        {expandedRecipeType === recipeType.value && (
                            <ScrollView horizontal>
                                {feeds.filter(feed => feed.RecipeType === recipeType.value).map(feed => (
                                    <FeedsDetail key={feed._id} data={feed} />
                                ))}
                            </ScrollView>
                        )}
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default Recipes;

const recipeTypes = [
    { title: 'Based On Your Food', value: 'basedOnYourFood' },
    { title: 'Trending Recipes', value: 'trendingRecipes' },
    { title: 'Breakfast', value: 'breakfast' },
    { title: 'Lunch', value: 'lunch' },
    { title: 'Dinner', value: 'dinner' },
];