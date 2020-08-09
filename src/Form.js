import React, { useEffect, useState } from "react";
import mockData from "./Data";
import "../src/styles.css";

export default function Form({ setFirstLine, setSecondLine, setThirdLine }) {
  const { data } = mockData;
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  // const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    setCountryList(Object.keys(data));
  }, [data]);

  function changeCountry(e) {
    const country = e && e.target && e.target.value;
    if (country) {
      const post = Object.keys(data[country].states);
      setSelectedCountry(e.target.value);
      setFirstLine(e.target.value);
      setStateList(post);
      setCityList([]);
      setSelectedState("");
      //   setSelectedCity("");
      setSecondLine("better");
      setThirdLine("best");
    } else {
      setSelectedCountry("");
      setSecondLine("better");
      setStateList([]);
      setCityList([]);
      setFirstLine("good");
    }
  }

  function changeState(e) {
    const { data } = mockData;
    const state = e && e.target && e.target.value;
    if (state && selectedCountry) {
      const post = data[selectedCountry].states[state].cities;
      setSecondLine(e.target.value);
      setSelectedState(e.target.value);
      setCityList(post);
      // setSelectedCity("");
      setThirdLine("best");
    } else {
      setSelectedState("");
      setSecondLine("better");
      setThirdLine("best");
      setCityList([]);
    }
  }

  function changeCity(e) {
    const city = e && e.target && e.target.value;
    setThirdLine(city);
    // setSelectedCity(city);
  }

  return (
    <div>
      <header className="App-header">
        <h1>Traffic Analsis</h1>
      </header>
      <form className="form-inline topview">
        <div className="dynamic-dropdown  form-group col-md-4">
          <label for="months" className="col-sm-2 col-form-label">
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={changeCountry}
            className="form-control col-sm-5"
          >
            <option value="">Select Country</option>
            {countryList.map((x, i) => {
              return <option key={i}>{x}</option>;
            })}
          </select>
        </div>

        <br />
        <div className="dynamic-dropdown form-group col-md-4">
          <label className="col-sm-2 col-form-label">State</label>
          <select
            value={selectedState}
            onChange={changeState}
            className="form-control col-sm-5"
          >
            <option value="">Select State</option>
            {stateList.map((x, i) => {
              return <option key={i}>{x}</option>;
            })}
          </select>
        </div>

        <br />
        {/* <div className="dynamic-dropdown form-group col-md-4">
          <label className="col-sm-2 col-form-label">City</label>
          <select
            value={selectedCity}
            onChange={changeCity}
            className="form-control col-sm-5"
          >
            <option value="">Select City</option>
            {cityList.map((x, i) => {
              return <option key={i}>{x}</option>;
            })}
          </select>
        </div> */}
      </form>
    </div>
  );
}
