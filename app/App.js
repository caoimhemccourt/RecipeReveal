import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, OnBoardingScreen, RecipeScreen, SignUp, Notifications, Profile } from './screens';
import { Provider } from "react-redux"
import "react-native-url-polyfill/auto";
import store from './context/store';
import { NavigationTab } from './components';

const Stack = createNativeStackNavigator();

const MyComponent = ({ setActiveScreen }) => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentScreen = navigation.getCurrentRoute().name
      setActiveScreen(currentScreen)
      console.log("Active Screen : ", currentScreen)
    })

    return unsubscribe
  }, [navigation]);
  return null;
}


const App = () => {
  const [activeScreen, setActiveScreen] = useState("")
  return (
    <NavigationContainer>
      <MyComponent setActiveScreen={setActiveScreen} />
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </Provider>

      {activeScreen !== "OnBoarding" && activeScreen !== "SignUp" && (
        <NavigationTab activeScreen={activeScreen} />
      )}
    </NavigationContainer>
  )
}

export default App