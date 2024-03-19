import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { FeedsDetail } from '../components'

const Feeds = ({feeds}) => {
  return (
    <View className="flex-column flex-wrap items-center justify-center p-20">
      {feeds?.length > 0 ? (
       <>
        {feeds?.map((item, i) => (
            <FeedsDetail key={i} data={item} /> 
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

export default Feeds