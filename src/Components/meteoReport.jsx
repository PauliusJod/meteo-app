import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1/forecast";
export default function MeteoReport(props) {
  const {
    temp,
    precipitation,
    wind,
    rain,
    cloudcover,
    mapMarkers,
    startDate,
    endDate,
    dataOut,
    dataIndexOut,
  } = props;
  const [data, setData] = useState([]);
  const [choosenMarkerWeather, setChoosenMarkerWeather] = useState(null);

  const [amountToShow, setAmountToShow] = useState(10);
  const loadMore = () => {
    setAmountToShow(amountToShow + 10);
  };
  const loadLess = () => {
    setAmountToShow(10);
  };
  useEffect(() => {
    dataOut(data);
    dataIndexOut(choosenMarkerWeather);
  }, [dataOut, dataIndexOut, data, choosenMarkerWeather]);

  const fetchData = async () => {
    const weatherPromises = mapMarkers.map(async (item) => {
      try {
        const response = await axios.get(
          `${API_URL}?latitude=${item.lat}&longitude=${
            item.lng
          }&hourly=temperature_2m,precipitation_probability,windspeed_80m,rain,cloudcover&daily=weathercode&timezone=Europe%2FMoscow&start_date=${
            startDate.toISOString().split("T")[0]
          }&end_date=${endDate.toISOString().split("T")[0]}`
        );
        return response.data;
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    const weatherData = await Promise.all(weatherPromises);
    setData(weatherData);
  };

  useEffect(() => {
    fetchData();
    setChoosenMarkerWeather(0);
  }, [mapMarkers]);

  return (
    <Container>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Point no.</th>
            <th>latitude</th>
            <th>longitude</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>{choosenMarkerWeather}</td>
            <td>{data[choosenMarkerWeather]?.latitude}</td>
            <td>{data[choosenMarkerWeather]?.longitude}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Time</th>
            {temp ? <th>{data?.hourly_units?.temperature_2m}</th> : <th></th>}
            {precipitation ? <th>precipitation probability %</th> : <th></th>}
            {rain ? <th>Rain</th> : <th></th>}
            {wind ? <th>Wind</th> : <th></th>}
            {cloudcover ? <th>Cloudcover</th> : <th></th>}
          </tr>
        </thead>
        <tbody>
          {data[choosenMarkerWeather]?.hourly?.time
            ?.slice(0, amountToShow)
            .map((item, i) => (
              <tr key={i}>
                <td>{item}</td>
                {temp ? (
                  <td>
                    {data[choosenMarkerWeather]?.hourly?.temperature_2m[i]}
                  </td>
                ) : (
                  <td></td>
                )}
                {precipitation ? (
                  <td>
                    {data[choosenMarkerWeather]?.hourly
                      ?.precipitation_probability[i] + " %"}
                  </td>
                ) : (
                  <td></td>
                )}
                {rain ? (
                  <td>{data[choosenMarkerWeather]?.hourly?.rain[i]}</td>
                ) : (
                  <td></td>
                )}
                {wind ? <td>no data</td> : <td></td>}
                {cloudcover ? (
                  <td>
                    {data[choosenMarkerWeather]?.hourly?.cloudcover[i] + " %"}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          <tr>
            <td colSpan={6}>
              {data &&
                amountToShow <
                  data[choosenMarkerWeather]?.hourly?.time?.length && (
                  <Button variant="danger" onClick={loadMore}>
                    Show More
                  </Button>
                )}
              {data && amountToShow > 10 && (
                <Button
                  variant="danger"
                  onClick={loadLess}
                  style={{ float: "right" }}
                >
                  Show only 10
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      {data && data.length > 0 ? (
        data.map((item, i) => (
          <Button
            variant="danger"
            key={i}
            onClick={() => setChoosenMarkerWeather(i)}
          >
            {i + 1}
          </Button>
        ))
      ) : (
        <p>No markers</p>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Latitude (Markers)</th>
            <th>Longitude (Markers)</th>
          </tr>
        </thead>
        <tbody>
          {mapMarkers
            ? mapMarkers.map((item, i) => (
                <tr key={i}>
                  <td>{item.lat}</td>
                  <td>{item.lng}</td>
                </tr>
              ))
            : console.log("coords", coords)}
        </tbody>
      </Table>
    </Container>
  );
}
