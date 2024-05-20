import { EChartsOption } from "echarts-for-react";

const generateMultilineSeries = (
  chartData: { name: string; data: (string | number)[][] }[],
) => {
  const seriesData: any = [];
  chartData.map((item) => {
    seriesData.push({
      type: "line",
      name: item.name,
      data: item.data,
      smooth: false,
      symbol: "",
      lineStyle: { width: 2 },
    });
  });
  return seriesData;
};

const multilineChartOptions = (
  chartData: { name: string; data: (string | number)[][] }[],
  colors?: string[],
  option?: Partial<EChartsOption>,
): EChartsOption => {
  const defaults: EChartsOption = {
    grid: {
      top: "5%",
      bottom: "25%",
      left: "5%",
      right: "5%",
      containLabel: true,
    },
    legend: {
      show: true,
      icon: "circle",
      bottom: 0,
      itemHeight: 8,
      itemWidth: 8,
    },
    tooltip: {
      show: true,
      trigger: "axis",
    },
    color: colors ?? ["#eab308", "#22c55e", "#06b6d4", "#8b5cf6"],
    xAxis: {
      type: "category",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: 500,
        margin: 20,
      },
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      min: 0,
      max: "dataMax",
      axisLabel: {
        show: false,
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: 500,
        margin: 20,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          width: 1.5,
          color: "#E5E7EB",
          opacity: 0.8,
        },
      },
    },
    series: generateMultilineSeries(chartData),
  };
  return { ...defaults, ...option };
};

export default multilineChartOptions;
