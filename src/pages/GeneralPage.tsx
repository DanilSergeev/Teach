import { FC, useEffect } from "react";
import { MapContainer, ImageOverlay, useMap,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
const mymap = require("../../src/assets/img/welcome.jpg");

// Компонент для настройки CRS после инициализации карты
const MapConfig: FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    // Устанавливаем CRS и границы после инициализации
    map.options.crs = L.CRS.Simple; // настройка плоскости (Сфера | плоскость)
    map.setMaxBounds(bounds); // ограничивает область просмотра границами изображения
    map.fitBounds(bounds); // подгоняет viewport под размеры изображения
  }, [map, bounds]);

  return null;
};
/* Для реактивного выделения областей (например, 
подсветки регионов при наведении) лучше всего подойдет плагин 
Leaflet.ImageOverlay.ArbitraryCRS. Он позволяет "привязать" ваше 
изображение к карте и использовать все возможности Leaflet для рисования 
векторных фигур поверх него.
  */
 
const GeneralPage: React.FC = () => {
  const imageBounds: L.LatLngBoundsExpression = [
    [0, 0],
    [1080, 1920],
  ];


  return (
    <main>
      <section className="wrapper" >
        <MapContainer
          bounds={imageBounds}
          minZoom={-1}
          maxZoom={4}
          zoomControl={true}
        >
          <MapConfig bounds={imageBounds} />

          
          <ImageOverlay url={mymap} bounds={imageBounds} />
        </MapContainer>
      </section>
    </main>
  );
};

export default GeneralPage;
