import sizes from '@assets/styles/sizes';
import React from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const data = {
  labels: ['01/08', '02/08', '03/08', '04/08', '05/08', '06/08'], // Ngày
  datasets: [
    {
      data: [200, 450, 300, 500, 700, 100], // Lượt nghe của bài hát 1
      strokeWidth: 2,
      color: () => `rgba(255, 0, 0, 0.6)`, // Màu đường bài hát 1
    },
    {
      data: [150, 300, 450, 600, 800, 1000], // Lượt nghe của bài hát 2
      strokeWidth: 2,
      color: () => `rgba(0, 255, 0, 0.6)`, // Màu đường bài hát 2
    },
    {
      data: [100, 250, 400, 550, 750, 20], // Lượt nghe của bài hát 3
      strokeWidth: 2,
      color: () => `rgba(0, 0, 255, 0.6)`, // Màu đường bài hát 3
    },
  ],
};

const RankingChart = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LineChart
        data={data}
        width={screenWidth - 30}
        height={sizes._320sdp}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8 }}
      />
    </ScrollView>
  );
};

export default RankingChart;
