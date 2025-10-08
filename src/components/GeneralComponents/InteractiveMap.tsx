import { FC, useEffect, useState } from "react";
import { MapContainer, ImageOverlay, useMap, Polygon, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import DevToolsInteractiveMap from "./DevToolsInteractiveMap";

const mymap = require("../../assets/img/testmap.png");


/** Кнопка включения/выключения полигонов  */
const PolygonControl: FC<{ isVisible: boolean; onToggle: () => void }> = ({ isVisible, onToggle }) => {
  const map = useMap();
  useEffect(() => {
    const PolygonButton = L.Control.extend({
      onAdd: () => {
        const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        const button = L.DomUtil.create("a", "", container);
        button.innerHTML = isVisible ? "Hide" : "Show";
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
    map.fitBounds(bounds); // подгоняет viewport под размеры изображения
    map.options.wheelPxPerZoomLevel = 1000; // Чувствительность колеса мыши
  }, [map, bounds]);
  return null;
};
/** Отслеживание зума  */
const ZoomTracker: FC = () => {
  const map = useMapEvents({
    zoomend: () => {
      const currentZoom = map.getZoom();
    //   console.log(currentZoom);
    },
  });
  return null;
}; 

const InteractiveMap: React.FC = () => {
  const [showPolygon, setShowPolygon] = useState(true);
  const imageBounds: L.LatLngBoundsExpression = [
    [0, 0],
    [1080, 1920],
  ];

  return (
    <div>
      {/* <DevToolsInteractiveMap></DevToolsInteractiveMap>   */}
      <section className="wrapper">
        <MapContainer bounds={imageBounds} minZoom={-1} maxZoom={4} zoomControl={true}>
          <MapConfig bounds={imageBounds} />
          <ImageOverlay url={mymap} bounds={imageBounds} />

          <PolygonControl isVisible={showPolygon} onToggle={() => setShowPolygon(!showPolygon)} />
          <ZoomTracker />

          {showPolygon ? (
            <Polygon
              positions={[
                [639, 568], [636, 607], [638, 623], [652, 626], [668, 656], [702, 670], [761, 648], [761, 586], [787, 544], [763, 482], [753, 410], [689, 416], [635, 432], [629, 486], [653, 502], [605, 542]
              ]}>
              <Popup>test</Popup>
            </Polygon>
          ) : (
            <></>
          )}
        </MapContainer>
      </section>
    </div>
  );
};

export default InteractiveMap;
