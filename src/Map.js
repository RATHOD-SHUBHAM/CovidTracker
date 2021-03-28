// map is now replaced to MapContainers. And mapContainers are immutable. Once set to certain value cant be changed.
import React from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
// this is for styling
import "./Map.css";
import {showDataOnMap} from "./maputil.js";

// This function is to make Map container Mutable.
function Map({ countries,center,zoom,caseType}) {

    function ChangeView({center,zoom}){
        const map = useMap();
        map.setView(center,zoom);
        return null;
    }

    return (
        <div className="map">
            <MapContainer
                caseType = {caseType}
                className = "map"
                center = {center}
                zoom = {zoom}
                scrollWheelZoom = {false}
            >
                <ChangeView center = {center} zoom={zoom}/>
                {/* Once we add the Tilelayer  we get a button like thing on the map */}
                {/* Then it will disapper once we import leaflet css in app.js */}
                <TileLayer
                    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMaps</a> contributors'
                />

                {/* I need some kind of function that will loop through and draw a bunch of circle on the map */}
                {/* the function will be in maputil.js */}
                {showDataOnMap(countries,caseType)}
            </MapContainer>   
        </div>
    );
}

export default Map;
