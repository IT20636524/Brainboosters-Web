import { EChartsOption } from "echarts-for-react";

const simpleCommonLineChartOptions = (
  chartData: (string | number)[][],
  markLineValue?: number,
  option?: Partial<EChartsOption>,
): EChartsOption => {
  const markLine = markLineValue && {
    markLine: {
      silent: true,
      symbol: "",
      lineStyle: {
        width: 2,
        color: "#fbbf24",
      },
      data: [
        {
          yAxis: markLineValue,
          label: {
            show: false,
          },
        },
      ],
    },
  };

  const defaults: EChartsOption = {
    grid: {
      top: "5%",
      bottom: "10%",
      left: "3%",
      right: "3%",
      containLabel: true,
    },
    color: "red",
    xAxis: {
      type: "category",
      data: chartData.map((item) => item[0]),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        color: "#9CA3AF",
        fontWeight: 500,
        margin: 20,
      },
      boundryGap: false,
    },
    yAxis: {
      type: "value",
      min: 0,
      max: "dataMax",
      axisLabel: {
        fontSize: 14,
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
    series: {
      type: "line",
      data: chartData.map((item) => item[1]),
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 2 },
      ...markLine,
    },
  };
  return { ...defaults, ...option };
};

export default simpleCommonLineChartOptions;
