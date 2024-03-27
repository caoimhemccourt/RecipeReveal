import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import TipsDetail from './tipsDetail'

const Tips = ({ data }) => {
  const tips = data?.tips

  return (
    <View className="flex-column flex-wrap items-center justify-center left-1 p-20">
      {tips && tips.length > 0 ? (
        <>
          {tips?.reduce((pairs, tip, index) => {
            if (index % 2 === 0) pairs.push([tip]);
            else pairs[pairs.length - 1].push(tip);
            return pairs;
          }, []).map((pair, i) => (
            <View key={i} className="flex-row">
              {/* Render each pair of tips */}
              {pair.map((item, j) => (
                <TipsDetail key={j} data={item} />
              ))}
            </View>
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
