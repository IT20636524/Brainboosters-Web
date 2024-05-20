interface IChart {
  option: echarts.EChartsOption | string;
  style?: {
    height?: string;
    width?: string;
  };
}

export default IChart;
