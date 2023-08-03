import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import PropTypes from "prop-types";

function DiagramComponent({
  data,
  dataIndex,
  precipitationIn,
  windIn,
  rainIn,
  cloudcoverIn,
}) {
  const [diagramData, setDiagramData] = useState({
    time: new Date().toISOString().split("T")[0],
    temp: null,
    precipitation: null,
    wind: null,
    rain: null,
    cloudcover: null,
  });
  useEffect(() => {
    if (data !== undefined) {
      const reformedData = data[dataIndex];
      if (Array.isArray(reformedData?.hourly?.time)) {
        const updatedData = reformedData?.hourly?.time?.map((item, i) => ({
          time: reformedData?.hourly?.time[i].split("T")[0],
          temp: reformedData?.hourly?.temperature_2m[i],
          precipitation: reformedData?.hourly?.precipitation_probability[i],
          wind: reformedData?.hourly?.windspeed_80m[i],
          rain: reformedData?.hourly?.rain[i],
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
      <XAxis dataKey="time" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="temp" stroke="#ed332d" />
      {precipitationIn ? (
        <Line type="monotone" dataKey="precipitation" stroke="#0db2ff" />
      ) : (
        <></>
      )}
      {windIn ? (
        <Line type="monotone" dataKey="wind" stroke="#82009d" />
      ) : (
        <></>
      )}
      {rainIn ? (
        <Line type="monotone" dataKey="rain" stroke="#1303ff" />
      ) : (
        <></>
      )}

      {cloudcoverIn ? (
        <Line type="monotone" dataKey="cloudcover" stroke="#595959" />
      ) : (
        <></>
      )}
    </LineChart>
  );
}
DiagramComponent.propTypes = {
  data: PropTypes.array,
  data: PropTypes.number,
};
export default DiagramComponent;
