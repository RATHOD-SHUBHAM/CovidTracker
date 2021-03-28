import { Circle, Popup } from "react-leaflet";
// this is a circle from interactive tootltip
// this is a Popup from interactive tool tip
import React from "react";
import numeral from "numeral";
// Numeral format the number in certain way

// Dictionary for my radius,
//  it has 3 keys. Cases, recoverd and deaths.

const caseTypeColors = {
    cases: {
        // hex: "#ffa500",// color for cirlce  // color orange
        hex: " #0000ff",
        multiplier: 800,    // size of the circle
    },
    recovered: {
        hex: "#7dd71d",
        // hex: "#3cf900",
        multiplier: 1200,
    },
    deaths: {
        // hex: "#fb4443",
        hex: "#CC1034",
        multiplier: 2000,
    },
};



// This is for the Map to draw circle with interactive tooltips.
export const showDataOnMap = (data, caseType) => (
    // for each element in data
    data.map(country => (
        // here i say draw a circle. Circle takes 5 attribute. Center,Color,FillColor,FillOpacity and radius
        <Circle
            center = {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity = {0.4} //slightly transperant
            // My radius size and color should change based on the death and recovery. So we will make a dictionary on top for it.
            pathOptions = {{
                color: caseTypeColors[caseType].hex,
                fillColor: caseTypeColors[caseType].hex,
            }}
            
        
            // radius size logic is like with more cases the circle should become bigger
            // so size of radius = no of cases * number of cases // so as the number of cases increases the size of radius also increases
            // also we multiply it with multiplier for different caseType
            radius ={
                Math.sqrt(country[caseType]/10) * caseTypeColors[caseType].multiplier
            }
        >
            {/* now when we tap the circle we need a popup */}
            <Popup>
                <div className= "info_container">
                    {/* first div is pretty much for the background */}
                    {/* careful the style is inside of the div tag and not in Between */}
                    <div className="info_flag" style = {{backgroundImage: `url(${country.countryInfo.flag})`}}>   
                    </div>

                    {/* Name of the country */}
                    <div className="info_name">
                        {country.country}
                    </div>

                    {/* Number of cases */}
                    <div className="info_confirmed">
                        Cases: {numeral(country.cases).format("0.0")}
                    </div>

                    {/* Number of recovered */}
                    <div className="info_recovered">
                        Recovered: {numeral(country.recovered).format("0.0")}
                    </div>

                    {/* Number of death */}
                    <div className="info_deaths">
                        Deaths: {numeral(country.deaths).format("0.0")}
                    </div>
                </div>
            </Popup>

        </Circle>
    ))
);