import { EChartsOption } from "echarts-for-react";

const generateBarSeries = (
  chartData: { name: string; data: (string | number)[][] }[],
) => {
  const seriesData: any = [];
  chartData.map((item) => {
    seriesData.push({
      type: "bar",
      name: item.name,
      data: item.data,
      smooth: false,
      symbol: "",
      barWidth: 60,
      barGap: "10%",
    });
  });
  return seriesData;
};

const barChartOptions = (
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
    series: generateBarSeries(chartData),
  };
  return { ...defaults, ...option };
};

export default barChartOptions;
