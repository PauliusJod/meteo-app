import {
  Container,
  Nav,
  Navbar,
  InputGroup,
  Col,
  Row,
  Button,
  Card,
} from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
const InfoBar = (props) => {
  const {
    // temp,
    onTempChanged,
    // precipitation,
    onPrecipitationChanged,
    // wind,
    onWindChanged,
    // rain,
    onRainChanged,
    // cloudcover,
    onCloudcoverChanged,
    onStartDateChanged,
    onEndDateChanged,
  } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tempChecked, setTempChecked] = useState(true);
  const [precipitationChecked, setPrecipitationChecked] = useState(false);
  const [windChecked, setWindChecked] = useState(false);
  const [rainChecked, setRainChecked] = useState(false);
  const [cloudcoverChecked, setCloudcoverChecked] = useState(false);

  const handleClick = () => {
    onTempChanged(tempChecked);
    onPrecipitationChanged(precipitationChecked);
    onWindChanged(windChecked);
    onRainChanged(rainChecked);
    onCloudcoverChanged(cloudcoverChecked);
    onStartDateChanged(startDate);
    onEndDateChanged(endDate);
  };
  // useEffect(() => {
  //   // console.log("tempChecked", temp);
  //   // console.log("precipitationChecked", precipitation);
  //   // console.log("windChecked", wind);
  //   // console.log("rainChecked", rain);
  //   // console.log("cloudcoverChecked", cloudcover);
  // }, [temp, precipitation, wind, rain, cloudcover]);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto" style={{ color: "white" }}>
          <InputGroup style={{ width: "30vh" }}>
            <Col>
              <Row>
                <Col style={{ minWidth: "80%" }}>
                  <p>Rodyti temperatūra</p>
                </Col>
                <Col>
                  <InputGroup.Checkbox
                    aria-label="Temperatūra"
                    checked={tempChecked}
                    onChange={() => setTempChecked(!tempChecked)}
                    disabled
                  />
                </Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col style={{ minWidth: "80%" }}>
                  <p>Rodyti kritulių tikimybę</p>
                </Col>
                <Col>
                  <InputGroup.Checkbox
                    aria-label="Krituliai"
                    checked={precipitationChecked}
                    onChange={() =>
                      setPrecipitationChecked(!precipitationChecked)
                    }
                  />
                </Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col style={{ minWidth: "80%" }}>
                  <p>Rodyti stiprų vėją</p>
                </Col>
                <Col>
                  <InputGroup.Checkbox
                    aria-label="Didelis vėjas"
                    checked={windChecked}
                    onChange={() => setWindChecked(!windChecked)}
                  />
                </Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col style={{ minWidth: "80%" }}>
                  <p>Rodyti lietaus duomenis</p>
                </Col>
                <Col>
                  <InputGroup.Checkbox
                    aria-label="Didelis vėjas"
                    checked={rainChecked}
                    onChange={() => setRainChecked(!rainChecked)}
                  />
                </Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col style={{ minWidth: "80%" }}>
                  <p>Rodyti debesuotumą</p>
                </Col>
                <Col>
                  <InputGroup.Checkbox
                    aria-label="Didelis vėjas"
                    checked={cloudcoverChecked}
                    onChange={() => setCloudcoverChecked(!cloudcoverChecked)}
                  />
                </Col>
              </Row>
              <Button onClick={handleClick}>Filter</Button>
            </Col>
          </InputGroup>
          <Col style={{ padding: "10px" }}>
            <Row>
              <Col>Nuo</Col>
              <Col>Iki</Col>
            </Row>
            <Row>
              <Col>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  // timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  maxDate={maxDate}
                />
              </Col>
              <Col>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  // timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd"
                  minDate={startDate}
                  maxDate={maxDate}
                />
              </Col>
            </Row>
          </Col>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default InfoBar;
