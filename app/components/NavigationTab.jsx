import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const NavigationTab = (activeScreen) => {
    const navigation = useNavigation()
  return (
    <View className="absolute bottom-4 w-full px-8">
      <View className="bg-[#A6EADD] rounded-xl px-4 py-6 w-full flex-row items-center justify-around">
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <MaterialCommunityIcons name="view-dashboard" size={32} color={activeScreen === "Dashboard" ? "white" : "#555"} />
        </TouchableOpacity>

        <TouchableOpacity>
            <MaterialCommunityIcons name="bowl-mix-outline" size={32} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity>
            <MaterialIcons name="menu-book" size={32} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={32} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NavigationTab