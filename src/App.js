import './App.css';
import React, { useState, useEffect} from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
} from '@material-ui/core';

// importing the file InfoBox.js
import InfoBox from './InfoBox.js';
import {PrettyPrintStat} from "./infoboxutil.js";

// import map.
import Map from './Map.js';
// leaflet for map
import "leaflet/dist/leaflet.css"

// import table
import Table from './Table.js';

//import the table util as we are sorting and passing the data
import { sortData } from "./tableutil.js";

import LineGraph from "./LineGraph.js"


// ------------------------- ---- All Import Ends Here ---------- -- -----------------------------






// ------------------------- ---- All State Begin Here ---------- -- -----------------------------

function App() {
  // Manually like this will take a lot of time so we will use API 
  const [countries, setcountries] = useState([]);

  // Remeber which option is being selected.
  const [country, setcountry] = useState('WorldWide');

  //remember a specific country information
  // storing the entire dictionary
  const [countryInfo, setcountryInfo] = useState({});


  // This is for tables
  const[tableData, settableData] = useState([]);

  // this is for cases;
  const[caseType, setcaseType] =  useState("cases");
  // state for map and line graph to change onClick
  // cases is being used as default or intial value when we lookup the app
  // const [caseType, setcaseType] = useState("cases")
  // but then casetype is already declared fopr cases so we use that

  // this is for map center and map zoom
  // coordinates are the center of the ocean
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setmapCountries] = useState([]);

  


// ------------------------- ---- All State Ends Here ---------- -- -----------------------------





// ------------------------- ---- All useEffect Begin Here ---------- -- -----------------------------


  // Making a Api call ==> disease.sh website
  // https://disease.sh/v3/covid-19/all
  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT is a hook. It runs a piece of code based on a given information.
  // We use Async method in USEEFFECT here.
  // we will send a request to server then wait for it and do something with that information
  useEffect(() => {
    const getCountriesData = async () => {
      // first fetch the data
      await fetch("https://disease.sh/v3/covid-19/countries")
      // then when it comes back with the responce, first take the json from it
      .then((response) => response.json())
      // once we got the responce. We set the countries
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,              // United states, United Kingdom, India
            value: country.countryInfo.iso2    // USA, UK, IN
          }
        ));
        // we are setting the countries with the countries that we got above
        // console.log("the country info is: ",countries);
        setcountries(countries);

        // Adding this piece of code here because only this useeffect fetch the information fo the country
        // console.log("the data info is: ",data);
        // sortData is a function coming from tableutil.js  
        const sortedData = sortData(data);
        settableData(sortedData);

        // for circles in map i want all of the data of all countries
        setmapCountries(data);
      });
    };
    // call the function we created above
    getCountriesData();
  }, []);


  // OnChange function which acts as a listner
  const onCountryChange = (event) => {
    // basically this is a onclick event which return a object.
    //console.log("the event is : ",event); 
    const countryCode = event.target.value;
    // console.log("the country code is ", countryCode);

    setcountry(countryCode);


    // On clicking . we need to pull information abput that coutry and display in cases, recoverd and deaths.
    // if we click world wide then i need to fetch information form all url else from country url
    const url = countryCode === "WorldWide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
    .then (response => response.json())
    .then(data => {
      // this is entire dictionary of that particular function
      // console.log("the data is: ",data);
      // setcountry(countryCode);
      setcountryInfo(data);

      //once we change the country in drop down. We can change our map location as well
      // console.log([data.countryInfo.lat, data.countryInfo.long]);
      countryCode === "WorldWide" ? setMapCenter([34.80746,-40.4796]):setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };

  // console.log("Country info is: ",countryInfo);

  // this will show the total cases for world wide
  // Without this the code will load but no stats will be seen. This will make the first inital load for worldwide
  // Note the code above ie.(fetch url) will load only when something is clicked.
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then (response => response.json())
    .then ((data) => {
      setcountryInfo(data);
    });
  }, [])


  // ------------------------- ---- All useEffect Ends Here ---------- -- -----------------------------




  return (
    // Bem naming convention => First name is the component and the second name is the element
    <div className="app">

      {/* Left Container */}
      <div className = "app__left">

        {/* Header */}
        {/* {Title} + Select input  dropdown field*/}

        <div className = "app__header">
          {/* <h1>My First actual project in React JS</h1> */}
          <h1>Covid-19 Tracker <h6>by Shubham Shankar</h6></h1>

          {/* This is the Drop Down */}
          <FormControl className ="app__dropdown">  {/* This is bem style ==> App is the Component and dropdown is the element we want */}
            <Select variant = "outlined" onChange={onCountryChange} value = {country} >
              {/* default drop down value is set to worlkdwide with country state*/}

              {/* WorldWide option is added manually as it doesnot come along with our api call */}
              <MenuItem value = "WorldWide">WorldWide</MenuItem>

              {/* Loop through all the countries and show a drop down list with country name based on the country value */}
              {/* this will receive the data from from useeffect above */}

              {countries.map((country) => (
                <MenuItem value = {country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>
      


        {/* {InfoBoxs} */}
        <div className = "app__stat">

          {/* title: corona virus cases */}
          {/* title: Corona virus recoveries */}
          {/* title: Corona virus deaths */}
          {/* In dictionary we dont care about the sequence doesnt matter */}


          {/* active box will say if caseType is cases the  casebox is active, 
          similarly if recovered is active then recoverd box is active */}

          <InfoBox 
            // active box
            active = {caseType === "cases"}
            // onclick makes the card clickale
            onClick = {e => setcaseType('cases')}
            // this display the content of the card
            title="Coronavirus Cases" 
            total = {PrettyPrintStat(countryInfo.cases)} 
            cases = {PrettyPrintStat(countryInfo.todayCases)}
          >
          </InfoBox>
          <InfoBox 
          // active box
            isGreen // just a isGreen which helps change the box color
            active = {caseType === "recovered"}
              // onclick makes the card clickale
            onClick = {e => setcaseType('recovered')}
            // this display the content of the card
            title="Recovered" 
            cases={PrettyPrintStat(countryInfo.todayRecovered)} 
            total= {PrettyPrintStat(countryInfo.recovered)}
          >
          </InfoBox>
          <InfoBox 
          // it will come inside InfoBox sees isRed then in  info.js it will maych then condition and call infoBox--isRed
            isRed // just a isGreen which helps change the box color
            // active box
            active = {caseType === "deaths"}
            // onclick makes the card clickale
            onClick = {e => setcaseType('deaths')}
            // this display the content of the card
            title="Deaths" 
            cases={PrettyPrintStat(countryInfo.todayDeaths)} 
            total ={PrettyPrintStat(countryInfo.deaths)}
          >
          </InfoBox>

        </div>

        {/* {Maps} */}
        {/* render map */}
        <Map 
        // without center and zoom the app kind off crash
          caseType = {caseType}  // this is for changing the map based on cards.
          countries = {mapCountries}
          center = {mapCenter}
          zoom = {mapZoom}
        />
      </div> 
      {/* left container ends here */}

      {/* Right Container */}
      <div className = "app_right_div">
        <Card className = "app__right">
          <CardContent>

            {/* {Tables} => To list out different countries */}
            <h3>Live Cases by Country</h3>
            {/* we pass a variable called table data */}
            <Table countries = {tableData}></Table>

            
            {/* {Graphs} */}
            {/* this will be a line graph */}
            {/* linegraph.js */}
            <div className = "app_right_linegraph">
              <h3 className = "app_right_graphtitle">World Wide New {caseType}: </h3>
              <LineGraph className = "app_right_graph" caseType = {caseType}/>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
