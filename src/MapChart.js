import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";


const geoUrl =
  "https://raw.githubusercontent.com/LeoXu1/counties-with-states-topojson/main/statesTopoJson.json";

const MapChart = ({ mode, setTooltipContent, guessLoc, curCityLoc, showCity, city, setGuessLoc }) => {
  const geoUrl =
    "https://raw.githubusercontent.com/LeoXu1/counties-with-states-topojson/main/"+mode+"TopoJson.json";

  const handleClick = (projection) => (evt) => {
    const svg = evt.target.closest("svg");

    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());
    const coords = projection.invert([x, y]);
    setGuessLoc(coords);
  };
  return (
    <>
      <ComposableMap data-tip="" projection="geoAlbersUsa"
      style={{
        maxHeight: "450"
      }}>
          <Geographies geography={geoUrl}>
            {({ geographies, projection }) => {
              return(
                <g onClick={handleClick(projection)}>
                {geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#ddd"
                    stroke="#aaa"
                    strokeWidth="0.5"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))}
                </g>
              )
            }}
          </Geographies>
          <Marker
            coordinates={guessLoc}
          >

            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
          </Marker>
          {showCity ? (
            <>
              <Marker
                coordinates={curCityLoc}
              >
                <circle r={3} fill="#0079d3" stroke="#000" strokeWidth={0.1} />
              </Marker>
            </>
          ) : (
            null
          )}
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
