import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import { SET_TIPS } from '../context/actions/tipsActions';
import { fetchTips } from '../sanity';


const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tips = useSelector((state) => state.tips);

  useEffect(() => {
    if (!tips) {
      // Simulating fetching data
      fetchTips().then(data => {
        dispatch(SET_TIPS(data)); // Dispatch action to set tips
      }).catch(error => {
        console.error("Error fetching tips:", error);
      });
    }
  }, [dispatch, tips]);

  console.log('Tips in Dashboard:', tips); // Log tips state

  const openLink = () => {
    if (tips && tips.tips && tips.tips.length > 0) {
      Linking.openURL(tips.tips[0].link)
        .catch(error => {
          console.error("Error opening link:", error);
        });
    } else {
      console.error("Invalid or missing tip data");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'start', backgroundColor: '#5FB6A6' }}>
      <Header />
      <View className="rounded-xl top-20 w-[90%] h-[25%] bg-[#A6EADD]">
        <Text className="text-base p-2 text-center font-semibold text-[#36454F]">Tips And Tricks</Text>
        <ScrollView horizontal>
          {tips && tips.tips && tips.tips.length > 0 ? (
            tips.tips.slice(0, 4).map((tip) => (
              <View className="flex-row rounded-xl p-2 ml-2 mr-2 mt-2 bg-[#5FB6A6]">
                <TouchableOpacity onPress={openLink} key={tip._id}>
                  <Image
                    source={{ uri: tip.mainImage?.asset.url }}
                    style={{ width: 55, height: 55 }}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <ActivityIndicator size="large" color="teal" />
          )}
        </ScrollView>
        <View className="p-2" />
        <TouchableOpacity className="flex items-center rounded-md p-2 bg-[#5FB6A6] mr-20 ml-20" onPress={() => navigation.navigate('TipsAndTrick')} >
          <Text className="text-sm font-semibold text-[#36454F]">View More Tips</Text>
        </TouchableOpacity>
        <View className="p-2" />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
