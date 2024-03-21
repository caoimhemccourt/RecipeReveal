import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { fetchFeeds } from '../sanity';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FEEDS } from '../context/actions/feedsActions';
import { Feeds, Header } from '../components';
import { useNavigation } from '@react-navigation/native';

const Recipes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const feeds = useSelector((state) => state.feeds);
    const navigation = useNavigation()


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

    return ( /* This will be the header code that can be used for all pages */
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header />

            {/* Scrollable container starts */}

            <View className="flex-1 items-center justify-center">
                <ScrollView style={{ width: '90%' }}>
                    {isLoading ? (
                        <View className="flex-1 h-60 p-20">
                            <ActivityIndicator size={"large"} color={"teal"} />
                        </View>
                    ) : (
                        <Feeds feeds={feeds?.feeds} />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Recipes