import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryBarProps } from 'victory';
import { VictoryTheme } from 'victory-core';

interface ChartData {
  zip: string;
  avgPrice: number;
}

interface Props {
  data: ChartData[];
}

const AverageRentChart: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={Dimensions.get('window').width - 32}
        height={300}
        padding={{ top: 20, bottom: 60, left: 60, right: 20 }}
      >
        <VictoryAxis
          tickFormat={(t: string) => t}
          tickLabelComponent={
            <VictoryLabel
              angle={-45}
              textAnchor="end"
              style={{ fontSize: 10 }}
            />
          }
          style={{
            axis: { stroke: "#756f6a" },
            grid: { stroke: "#f0f0f0" }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x: number) => `$${x}`}
          style={{
            axis: { stroke: "#756f6a" },
            grid: { stroke: "#f0f0f0" }
          }}
        />
        <VictoryBar
          data={data}
          x="zip"
          y="avgPrice"
          style={{
            data: {
              fill: (props: any) => {
                const maxPrice = Math.max(...data.map(d => d.avgPrice));
                const minPrice = Math.min(...data.map(d => d.avgPrice));
                const percentage = (props.datum.avgPrice - minPrice) / (maxPrice - minPrice);
                return `rgba(76, 175, 80, ${0.5 + percentage * 0.5})`;
              },
              width: 20
            }
          }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 }
          }}
          labels={(props: any) => `$${props.datum.avgPrice}`}
          labelComponent={
            <VictoryLabel
              dy={-10}
              style={{ fontSize: 10, fill: "#666" }}
            />
          }
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  }
});

export default AverageRentChart; 