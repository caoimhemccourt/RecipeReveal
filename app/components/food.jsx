import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { FoodDetail } from '../components'


const Food = ({ food }) => {
    return (
        <View className="flex-column flex-wrap items-center justify-center p-20">
          {food?.length > 0 ? (
           <>
            {food?.map((item, i) => (
                <FoodDetail key={i} data={item} /> 
            ))}
           </>
          ) : (
             <View className="w-full h-200 flex items-center justify-center">
                <ActivityIndicator size={"large"} color={"teal"} />
                <Text>No Data</Text>
            </View>
          )}
        </View>
      )
    }

export default Food