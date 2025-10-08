import { FC, useEffect, useState } from "react";
import {  MapContainer,  ImageOverlay,  useMap,  useMapEvents,   Polygon,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const mymap = require("../../assets/img/welcome.jpg");


const MapClickHandler: FC<{ onMapClick: (latlng: L.LatLng) => void }> = ({onMapClick,}) => {// Компонент для обработки кликов по карте
  useMapEvents({click: (e) => {onMapClick(e.latlng); console.log(e)}});
  return null;
};

const MapConfig: FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => { // Компонент для настройки CRS после инициализации карты
  const map = useMap();
  useEffect(() => {
    map.options.crs = L.CRS.Simple;
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
  }, [map, bounds]);
  return null;
};

/**
 * Components for obtaining crs bounds 
 */
const DevToolsInteractiveMap: React.FC = () => {
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const imageBounds: L.LatLngBoundsExpression = [[0, 0],[1080, 1920],];
  const pointsString = points.map((point) => `[${point.lat|0}, ${point.lng|0}]`).join(", ");

  return (
    <div className="wrapper">
      <MapContainer bounds={imageBounds} minZoom={-1} maxZoom={4} zoomControl={true} >
        <ImageOverlay url={mymap} bounds={imageBounds} />
        <MapConfig bounds={imageBounds} />
        <MapClickHandler onMapClick={(latlng: L.LatLng) => {setPoints((prev) => [...prev, latlng])}} />

        <Polygon positions={points}  />
      </MapContainer>
      <div>
        <b>Координаты точек:</b>
        <p>{pointsString || "нет точек"}</p>
      </div>
    </div>
  );
};

export default DevToolsInteractiveMap;
