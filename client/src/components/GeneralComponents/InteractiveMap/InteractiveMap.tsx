import { FC, useEffect, useState } from "react";
import { MapContainer, ImageOverlay, useMap, Polygon, Popup, useMapEvents, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./interactiveMap.scss";
import * as L from "leaflet";
import DevToolsInteractiveMap from "./DevToolsInteractiveMap";

const mymap = require("../../../assets/img/testmap.png");

interface IPolygon {
  position: L.LatLngExpression[];
  color?: string;
  children?: React.ReactNode;
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
  }, []);

  return null;
};

/** Конфиг текста*/
const TextMap: FC<{ position: L.LatLngExpression; text: string }> = ({ position, text }) => {
  const textIcon = new L.DivIcon({ html: `<p>${text}</p>`, className: "intaractiveMapTextH2" });
  return <Marker position={position} icon={textIcon} />;
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
    },
  });

  return coordinates ? (
    <div style={{ position: "absolute", bottom: "1vh", right: "2vw", zIndex: 1000 }}>
      X: {coordinates.lat.toFixed(0)}
      Y: {coordinates.lng.toFixed(0)}
    </div>
  ) : null;
};

const InteractiveMap: React.FC = () => {
  const [showPolygon, setShowPolygon] = useState(true);
  const [showZoomOverOne, setShowZoomOverOne] = useState(false);

  const imageBounds: L.LatLngBoundsExpression = [
    [0, 0],
    [1080, 1920],
  ];

  /** Отслеживание зума  */
  const ZoomTracker: FC = () => {
    const map = useMapEvents({
      zoomend: () => {
        const currentZoom = map.getZoom();
        currentZoom >= 2 ? setShowZoomOverOne(true) : setShowZoomOverOne(false);
      },
    });
    return null;
  };

  /** Кастомный полигон
   * @example color="#FF00FF"
   * position={[[639, 668],[653, 502],[805, 542],]}
   */
  const MyPolygon: FC<IPolygon> = ({ position, color = "#ff0000ff", children }) => {
    return (
      <Polygon pathOptions={{ color, fillOpacity: 0.15, opacity: 0.4 }} positions={[position]}>
        {children}
      </Polygon>
    );
  };

  return (
    <>
      {/* <DevToolsInteractiveMap></DevToolsInteractiveMap>   */}
      <MapContainer className="InteractiveMap" bounds={imageBounds} minZoom={-1} maxZoom={4} zoomControl={true}>
        <MapConfig bounds={imageBounds} />
        <ImageOverlay url={mymap} bounds={imageBounds} />

        <PolygonControl isVisible={showPolygon} onToggle={() => setShowPolygon(!showPolygon)} />
        <ZoomTracker />
        <CoordinatesTracker />

        {showZoomOverOne ? (
          <>
            <TextMap position={[100, 500]} text="asd" />
            <TextMap position={[300, 500]} text="ggrg" />
          </>
        ) : (
          <></>
        )}

        {showPolygon ? (
          <>
            <MyPolygon
              color="#1eff00ff"
              position={[
                [639, 668],
                [653, 502],
                [805, 542],
              ]}></MyPolygon>
            <MyPolygon
              color="#001affff"
              position={[
                [62, 38],
                [123, 122],
                [200, 542],
              ]}
            />
          </>
        ) : (
          <></>
        )}
      </MapContainer>
    </>
  );
};

export default InteractiveMap;
