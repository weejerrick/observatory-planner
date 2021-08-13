import React, { useContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DarkModeContext } from "../App";

export default function DSOChart(props) {
  const darkModeContext = useContext(DarkModeContext);
  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={170}
        data={props.plot}
        margin={{
          right: 20,
          left: -20,
          bottom: 25,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkModeContext ? "#777B7E" : "#D9DDDC"}
        />
        <YAxis
          stroke={darkModeContext ? "#b0bec5" : "#546e7a"}
          domain={[10, 90]}
          tick={{ fontSize: 10 }}
          allowDataOverflow={true}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkModeContext ? "#4A4A4A" : "#fff",
            opacity: 0.8,
          }}
        />
        {/* <Legend /> */}
        <Line
          type={"natural"}
          dataKey="alt"
          dot={false}
          stroke={darkModeContext ? "#D9DDDC" : "#777B7E"}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
