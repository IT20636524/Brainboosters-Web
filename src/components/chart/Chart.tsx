"use client";
import ReactEcharts from "echarts-for-react";
import React, { ForwardedRef } from "react";
import IChart from "./IChart";

const Chart = React.forwardRef(
  ({ option, style }: IChart, ref: ForwardedRef<any>) => (
    <ReactEcharts ref={ref} option={option} style={style} />
  ),
);

export default Chart;
