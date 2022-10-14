import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const RadarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="Points"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
