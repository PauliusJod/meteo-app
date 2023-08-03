import React, { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import PropTypes from "prop-types";

// const data = [
//   { name: "Page A", uv: 200, pv: 55555, amt: 2400 },
//   { name: "Page B", uv: 5555, pv: 2400, amt: 2400 },
// ];

function DiagramComponent({ data, dataIndex }) {
  const [diagramData, setDiagramData] = useState({
    time: new Date().toISOString().split("T")[0],
    temp: null,
    precipitation: null,
    cloudcover: null,
  });
  useEffect(() => {
    console.log("data", data);
    console.log("dataIndex", dataIndex);
    if (data !== undefined) {
      const reformedData = data[dataIndex];
      console.log(reformedData);
      if (Array.isArray(reformedData?.hourly?.time)) {
        const updatedData = reformedData?.hourly?.time?.map((item, i) => ({
          time: reformedData?.hourly?.time[i],
          temp: reformedData?.hourly?.temperature_2m[i],
          precipitation: reformedData?.hourly?.precipitation_probability[i],
          cloudcover: reformedData?.hourly?.cloudcover[i],
        }));
        setDiagramData(updatedData);
        console.log("diagramData", diagramData);
      } else {
        console.log("not array");
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
