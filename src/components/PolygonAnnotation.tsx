import { useState } from 'react';
import PolygonDrawer from 'react-polygon-drawer';

interface Polygon {
    points: { x: number; y: number }[];
    // Add other properties if PolygonDrawer provides more
}

export function PolygonAnnotation() {
  const [polygons, setPolygons] = useState<Polygon[]>([]);

const handlePolygonComplete = (newPolygon: Polygon) => {
    setPolygons([...polygons, newPolygon]);
};

  return (
    <div>
      <h3>Polygon Annotation</h3>
      <PolygonDrawer onPolygonComplete={handlePolygonComplete} />
      <div>
        {polygons.map((polygon, index) => (
          <div key={index}>
            Polygon {index + 1}: {JSON.stringify(polygon)}
          </div>
        ))}
      </div>
    </div>
  );
}