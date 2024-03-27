import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTips } from '../sanity';
import { SET_TIPS } from '../context/actions/tipsActions';
import { Tips, Header } from '../components';


const TipsAndTricks = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const tips = useSelector((state) => state.tips);
    const navTabHeight = 75


    useEffect(() => {
        setIsLoading(true);

        try {
            fetchTips()
                .then(res => {
                    dispatch(SET_TIPS(res));
                    setTimeout(() => {
                        setIsLoading(false);
                        console.log("Tips from Store:", res)
                    }, 2000);
                })
                .catch(error => {
                    console.error("Error during fetchTips:", error);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error("Error outside fetchTips:", error);
        }
    }, [dispatch]);

    console.log("Tips:", tips)

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-[#5FB6A6]">
            <Header />

            <View className="flex-1 items-center justify-center" style={{ paddingBottom: navTabHeight }}>
                <ScrollView style={{ width: '80%' }}>
                    {isLoading ? (
                        <View className="flex-1 h-60 p-20">
                            <ActivityIndicator size={"large"} color={"teal"} />
                        </View>
                    ) : (
                        <Tips key={tips} data={tips} />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default TipsAndTricks