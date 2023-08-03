import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import PropTypes from "prop-types";

function DiagramComponent({ data, dataIndex }) {
  const [diagramData, setDiagramData] = useState({
    time: new Date().toISOString().split("T")[0],
    temp: null,
    precipitation: null,
    cloudcover: null,
  });
  useEffect(() => {
    if (data !== undefined) {
      const reformedData = data[dataIndex];
      if (Array.isArray(reformedData?.hourly?.time)) {
        const updatedData = reformedData?.hourly?.time?.map((item, i) => ({
          time: reformedData?.hourly?.time[i],
          temp: reformedData?.hourly?.temperature_2m[i],
          precipitation: reformedData?.hourly?.precipitation_probability[i],
          cloudcover: reformedData?.hourly?.cloudcover[i],
        }));
        setDiagramData(updatedData);
      } else {
        console.log("Not an array");
      }
    }
  }, [data, dataIndex]);
  return (
    <LineChart width={500} height={300} data={diagramData}>
      <XAxis dataKey="time" /> {/* Time */}
      <YAxis /> {/* C, Precipitation, Cloudcover */}
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="temp" stroke="#8884d8" />
      <Line type="monotone" dataKey="precipitation" stroke="#82ca9d" />
      <Line type="monotone" dataKey="cloudcover" stroke="#82009d" />
    </LineChart>
  );
}
DiagramComponent.propTypes = {
  data: PropTypes.array,
  data: PropTypes.number,
};
export default DiagramComponent;
