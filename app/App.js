import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, OnBoardingScreen, RecipeScreen, SignUp, Notifications, Profile, Recipes, Food, TipsAndTricks, YourFood, YourRecipes, ShoppingList } from './screens';
import { Provider } from "react-redux"
import "react-native-url-polyfill/auto";
import store from './context/store';
import { NavigationTab } from './components';
import LogFood from './screens/logFood';

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
          <Stack.Screen name="Recipes" component={Recipes} />
          <Stack.Screen name="TipsAndTrick" component={TipsAndTricks} />
          <Stack.Screen name="Food" component={Food} />
          <Stack.Screen name="LogFood" component={LogFood} />
          <Stack.Screen name="YourFood" component={YourFood} />
          <Stack.Screen name="YourRecipes" component={YourRecipes} />
          <Stack.Screen name="ShoppingList" component={ShoppingList} />
        </Stack.Navigator>
      </Provider>

      {activeScreen !== "OnBoarding" && activeScreen !== "SignUp" && (
        <NavigationTab activeScreen={activeScreen} />
      )}
    </NavigationContainer>
  )
}

export default App