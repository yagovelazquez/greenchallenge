import {
  ResponsiveContainer,
  BarChart as RechartBarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function BarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="Points" fill="#8884d8" background={{ fill: "#eee" }} />
      </RechartBarChart>
    </ResponsiveContainer>
  );
}

export default BarChart;
