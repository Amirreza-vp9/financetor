import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { gql, useQuery } from "@apollo/client";

const GET_MY_EXPENSES = gql`
  query GetMyExpenses {
    getMyExpenses {
      _id
      amount
      geo {
        lat
        lon
      }
      tags {
        _id
        name
        color
      }
      date
      address {
        MunicipalityZone
        Neighbourhood
        FormattedAddress
        Place
      }
    }
  }
`;

const Chart = () => {
  // const [cahrtData, setChartData] = useState([])
  const { loading, error, data, refetch } = useQuery(GET_MY_EXPENSES);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error :(</p>;

  console.log(data);

  let chartData = [];

  data.getMyExpenses.filter((item) => {
    chartData = [
      ...chartData,
      { name: item.date, uv: item.amount, pv: 2400, amt: 2400 },
    ];
  });

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default Chart;
