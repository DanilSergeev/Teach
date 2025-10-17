import { FC, useEffect, useState } from "react";
import { MapContainer, ImageOverlay, useMap, Polygon,  useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./interactiveMap.scss";
import * as L from "leaflet";
import DevToolsInteractiveMap from "./DevToolsInteractiveMap";

const mymap = require("../../../assets/img/testmap.png");

type TextVariant = "textSea" | "textSnow" | "intaractiveMapTextH2" | string;

interface IPolygon {
  position: L.LatLngExpression[];
  color?: string;
  children?: React.ReactNode;
  variant?: string;
}
interface ITextMap {
  position: L.LatLngExpression;
  text?: string;
  variant?: TextVariant;
  point?: boolean;
}


/** Кнопка включения/выключения полигонов  */
const PolygonControl: FC<{ isVisible: boolean; onToggle: () => void }> = ({ isVisible, onToggle }) => {
  const map = useMap();
  useEffect(() => {
    const PolygonButton = L.Control.extend({
      onAdd: () => {
        const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        const button = L.DomUtil.create("a", "", container);
        button.innerHTML = isVisible ? "★" : "☆";
        button.href = "#";

        L.DomEvent.on(button, "click", L.DomEvent.stop).on(button, "click", onToggle);

        return container;
      },
    });

    const control = new PolygonButton({ position: "topleft" });
    control.addTo(map);
    return () => {
      control.remove();
    };
  }, [map, isVisible, onToggle]);
  return null;
};

/** Конфиг  */
const MapConfig: FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.options.crs = L.CRS.Simple; // настройка плоскости (Сфера | плоскость)
    map.setMaxBounds(bounds); // ограничивает область просмотра границами изображения
    map.options.wheelPxPerZoomLevel = 1000; // Чувствительность колеса мыши
  }, [map, bounds]);
  useEffect(() => {
    map.fitBounds(bounds); // подгоняет viewport под размеры изображения
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

/** Конфиг текста*/
const TextMap: FC<ITextMap> = ({ position, text, variant = "", point = false }) => {
  const textIcon = new L.DivIcon({
    html: ` ${point ? '<div></div>' : ''} <p>${text}</p>`,
    className: `textMap ${variant}`
  });
  return <Marker position={position} icon={textIcon} />;
};

/** Трекер координат и зума */
const MapTracker: FC<{ onZoomChange?: (zoom: number) => void }> = ({ onZoomChange }) => {
  const [coordinates, setCoordinates] = useState<L.LatLng | null>(null);
  const [zoom, setZoom] = useState<number>(0);
  const map = useMap();

  useMapEvents({
    mousemove: (e) => {
      setCoordinates(e.latlng);
    },
    mouseout: () => {
      setCoordinates(null);
    },
    zoomend: () => {
      const currentZoom = map.getZoom();
      setZoom(currentZoom);
      onZoomChange?.(currentZoom);
    },
  });

  return coordinates ? (
    <div style={{ position: "absolute", bottom: "1vh", right: "2vw", zIndex: 1000 }}>
      X:{coordinates.lat.toFixed(0)} Y:{coordinates.lng.toFixed(0)} Z:{zoom}
    </div>
  ) : null;
};
/** Кастомный полигон
 * @example color="#FF00FF"
 * position={[[639, 668],[653, 502],[805, 542],]}
 */
const MyPolygon: FC<IPolygon> = ({ position, color = "#ff0000", children }) => {
  return (
    <Polygon pathOptions={{ color, fillOpacity: 0.15, opacity: 0.4 }} positions={[position]}>
      {children}
    </Polygon>
  );
};
const InteractiveMap: React.FC = () => {
  const [showPolygon, setShowPolygon] = useState(false);
  const [showZoomOverOne, setShowZoomOverOne] = useState(false);
  const imageBounds: L.LatLngBoundsExpression = [[0, 0], [1080, 1920],];

  /** Обработчик изменения зума */
  function handleZoomChange(zoom: number) {
    setShowZoomOverOne(zoom >= 2);
  }

  return (
    <>
      {/* <DevToolsInteractiveMap></DevToolsInteractiveMap>   */}
      <MapContainer className="InteractiveMap" bounds={imageBounds} minZoom={-1} maxZoom={4} zoomControl={true}>
        <MapConfig bounds={imageBounds} />
        <ImageOverlay url={mymap} bounds={imageBounds} />
        <PolygonControl isVisible={showPolygon} onToggle={() => setShowPolygon(!showPolygon)} />
        <MapTracker onZoomChange={handleZoomChange} />

        {/* map components */}
        {showZoomOverOne ? (<>
          <TextMap position={[100, 500]} text="Tset" />
          <TextMap position={[300, 500]} text="Ne test" />
        </>) : (<></>)}
        <TextMap position={[66, 270]} point={true} text="WIW" variant="textSnow intaractiveMapTextH2" />
        <TextMap position={[666, 270]} text="Lorem ipsome" />

        {showPolygon ? (<>
          <MyPolygon color="#1eff00ff" position={[[639, 668], [653, 502], [805, 542],]}></MyPolygon>
          <MyPolygon color="#001affff" position={[[62, 38], [123, 122], [200, 542],]} />
        </>) : (<></>)}
      </MapContainer>
    </>
  );
};

export default InteractiveMap;
