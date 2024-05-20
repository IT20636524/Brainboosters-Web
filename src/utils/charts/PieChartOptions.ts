import { EChartsOption } from "echarts-for-react";

const pieChartOptions = (
  chartData: { name: string; value: number }[],
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
    series: [
      {
        type: "pie",
        radius: ["67%", "82%"],
        data: chartData,
      },
    ],
  };
  return { ...defaults, ...option };
};

export default pieChartOptions;
