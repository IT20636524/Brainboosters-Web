"use client";
import ModalController from "@components/modal/ModalController";
import { childStore } from "@stores/StoreInitializer";
import InfoCardCollection from "@components/info-card-collection/InfoCardCollection";
import Chart from "@components/chart/Chart";
import multilineChartOptions from "@utils/charts/MultilineChartOptions";
import { Card } from "flowbite-react";
import CardHeader from "@components/card-header/CardHeader";
import barChartOptions from "@utils/charts/BarChartOptions";
import pieChartOptions from "@utils/charts/PieChartOptions";

export default function Home() {
  const individualGrowthData = [
    {
      name: "Focus",
      data: [
        ["01/01/2023", 10],
        ["02/01/2023", 15],
        ["03/01/2023", 8],
        ["04/01/2023", 25],
        ["05/01/2023", 18],
      ],
    },
    {
      name: "Memory",
      data: [
        ["01/01/2023", 5],
        ["02/01/2023", 8],
        ["03/01/2023", 12],
        ["04/01/2023", 20],
        ["05/01/2023", 15],
      ],
    },
    {
      name: "Impulsivity",
      data: [
        ["01/01/2023", 12],
        ["02/01/2023", 10],
        ["03/01/2023", 14],
        ["04/01/2023", 8],
        ["05/01/2023", 17],
      ],
    },
    {
      name: "Organization & Time Management",
      data: [
        ["01/01/2023", 8],
        ["02/01/2023", 14],
        ["03/01/2023", 9],
        ["04/01/2023", 16],
        ["05/01/2023", 12],
      ],
    },
  ];
  const benchmarkComparisons = [
    {
      name: "Average Benchmark",
      data: [
        ["Memory", 10],
        ["Organization", 15],
        ["Attention", 8],
        ["Impulsivity", 25],
      ],
    },
    {
      name: "Child's Score",
      data: [
        ["Memory", 6],
        ["Organization", 10],
        ["Attention", 3],
        ["Impulsivity", 20],
      ],
    },
  ];
  const timeSpentOnEachArea = [
    {
      name: "Memory",
      value: 10,
    },
    {
      name: "Organization",
      value: 8,
    },
    {
      name: "Attention",
      value: 12,
    },
    {
      name: "Impulsivity",
      value: 6,
    },
  ];
  return (
    <div className="px-10 mt-6">
      <div className="font-bold text-2xl mb-4">Analytics</div>
      <Card className="mb-4">
        <CardHeader
          title="Individual Growth"
          tooltipContent="This chart helps visualize the progress the child is making in each critical area over time."
        />
        <Chart
          option={multilineChartOptions(individualGrowthData)}
          style={{ width: "100%", height: "400px" }}
        />
      </Card>
      <Card className="mb-4">
        <CardHeader
          title="Benchmark Comparisons"
          tooltipContent="Comparing child's scores to average benchmarks, parents can gauge how the child is performing relative to typical development or peers"
        />
        <Chart
          option={barChartOptions(benchmarkComparisons)}
          style={{ width: "100%", height: "400px" }}
        />
      </Card>
      <Card className="mb-4">
        <CardHeader
          title="Time Spent on Each Area"
          tooltipContent="Provides insights into which areas the child is spending the most time on, which could indicate areas of interest or areas of difficulty"
        />
        <Chart
          option={pieChartOptions(timeSpentOnEachArea)}
          style={{ width: "100%", height: "400px" }}
        />
      </Card>

      <ModalController />
    </div>
  );
}
