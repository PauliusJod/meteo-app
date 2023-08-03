import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import MeteoReport from "./Components/meteoReport";
import InfoBar from "./Components/navBar";
import MapComponent from "./Components/mapComponent";
import DiagramComponent from "./Components/diagramComponent";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tempChecked, setTempChecked] = useState(true);
  const [precipitationChecked, setPrecipitationChecked] = useState(false);
  const [windChecked, setWindChecked] = useState(false);
  const [rainChecked, setRainChecked] = useState(false);
  const [cloudcoverChecked, setCloudcoverChecked] = useState(false);
  const [markersCoords, setMarkersCoords] = useState([]);
  const [dataOut, setDataOut] = useState([]);
  const [dataIndexOut, setDataIndexOut] = useState(null);

  const handleTempChange = (data) => {
    setTempChecked(data);
  };
  const handlePrecipitationChange = (data) => {
    setPrecipitationChecked(data);
  };
  const handleWindChange = (data) => {
    setWindChecked(data);
  };
  const handleRainChange = (data) => {
    setRainChecked(data);
  };
  const handleCloudcoverChange = (data) => {
    setCloudcoverChecked(data);
  };
  const handleMarkersCoordsChange = (data) => {
    setMarkersCoords(data);
  };
  const handleStartDateChange = (data) => {
    setStartDate(data);
  };
  const handleEndDatesChange = (data) => {
    setEndDate(data);
  };
  const handleDataChanges = (data) => {
    setDataOut(data);
  };
  const handleDataIndexChanges = (index) => {
    setDataIndexOut(index);
  };
  return (
    <>
      <InfoBar
        temp={tempChecked}
        onTempChanged={handleTempChange}
        precipitation={precipitationChecked}
        onPrecipitationChanged={handlePrecipitationChange}
        wind={windChecked}
        onWindChanged={handleWindChange}
        rain={rainChecked}
        onRainChanged={handleRainChange}
        cloudcover={cloudcoverChecked}
        onCloudcoverChanged={handleCloudcoverChange}
        onStartDateChanged={handleStartDateChange}
        onEndDateChanged={handleEndDatesChange}
      />
      <Container>
        <Row>
          <Col>
            <MeteoReport
              temp={tempChecked}
              precipitation={precipitationChecked}
              wind={windChecked}
              rain={rainChecked}
              cloudcover={cloudcoverChecked}
              mapMarkers={markersCoords}
              startDate={startDate}
              endDate={endDate}
              dataOut={handleDataChanges}
              dataIndexOut={handleDataIndexChanges}
            />
          </Col>
          <Col>
            <MapComponent
              markers={markersCoords}
              onMarkersChanged={handleMarkersCoordsChange}
            />
            <DiagramComponent
              data={dataOut}
              dataIndex={dataIndexOut}
              precipitationIn={precipitationChecked}
              windIn={windChecked}
              rainIn={rainChecked}
              cloudcoverIn={cloudcoverChecked}
            />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
