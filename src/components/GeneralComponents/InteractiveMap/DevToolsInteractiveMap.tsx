import { FC, useEffect, useState } from "react";
import {  MapContainer,  ImageOverlay,  useMap,  useMapEvents,   Polygon,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const mymap = require("../../assets/img/testmap.png");


const MapClickHandler: FC<{ onMapClick: (latlng: L.LatLng) => void }> = ({onMapClick,}) => {// Компонент для обработки кликов по карте
  useMapEvents({click: (e) => {onMapClick(e.latlng); console.log(e)}});
  
  return null;
};
/** Отслеживание координат мыши */
const CoordinatesTracker: FC = () => {
  const [coordinates, setCoordinates] = useState<L.LatLng | null>(null);
  
  useMapEvents({
    mousemove: (e) => {
      setCoordinates(e.latlng);
    },
    mouseout: () => {
      setCoordinates(null);
    }   
  });

  return coordinates ? (
    <div style={{position: "absolute",bottom: "1vh",right: "2vw", zIndex:1000}} >
      X: {coordinates.lat.toFixed(0)}
      Y: {coordinates.lng.toFixed(0)}
    </div>
  ) : null;
};

const MapConfig: FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => { // Компонент для настройки CRS после инициализации карты
  const map = useMap();
  map.getContainer().style.cursor = 'copy';
  useEffect(() => {
    map.options.crs = L.CRS.Simple;
    map.setMaxBounds(bounds);
  }, [map, bounds]);
  useEffect(()=>{
    map.fitBounds(bounds);
  },[])
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
    <div className="wrapper"  >
      <MapContainer bounds={imageBounds} minZoom={0} maxZoom={4} zoomControl={true} >
        <MapConfig bounds={imageBounds} />
        <ImageOverlay url={mymap} bounds={imageBounds} />
        <MapClickHandler onMapClick={(latlng: L.LatLng) => {setPoints((prev) => [...prev, latlng])}} />
        <CoordinatesTracker  />
        <Polygon positions={points} />
      </MapContainer>
      <div>
        <b>Координаты точек:</b>
        <p>{pointsString || "нет точек"}</p>
      </div>
    </div>
  );
};

export default DevToolsInteractiveMap;
