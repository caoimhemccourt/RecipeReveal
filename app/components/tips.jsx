import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import TipsDetail from './tipsDetail'

const Tips = ({ tips }) => {
    return (
        <View className="flex-column flex-wrap items-center justify-center p-20">
            {tips?.length > 0 ? (
                <>
                    {tips?.map((item, i) => (
                        <TipsDetail key={i} data={item} />
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

export default Tips