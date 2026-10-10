import { useState } from 'react'
import { Map as MapGL, Marker, Popup } from 'react-map-gl/maplibre'
import type { MapLayerMouseEvent } from 'react-map-gl/maplibre'
import { setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import type { Map as MaplibreMap } from 'maplibre-gl'

setWorkerUrl(workerUrl)
type Point = { lng: number; lat: number }

export default function App() {
  const [points, setPoints] = useState<Point[]>([])
  const [selected, setSelected] = useState<number | null>(null)
const ROAD_LABEL_LAYERS = ['highway-name-major', 'highway-name-minor', 'highway-name-path']
const handleClick = (e: MapLayerMouseEvent) => {
  setSelected(null)
  const { lng, lat } = e.lngLat.wrap()
  setPoints((p) => [...p, { lng, lat }])
}

  return (
    <MapGL
      initialViewState={{ longitude: 106.7009, latitude: 10.7769, zoom: 12 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      onClick={handleClick}
      projection={{ type: 'globe' }}
      onLoad={(e) => {
      const map = e.target
      ROAD_LABEL_LAYERS.forEach((id) => {
        if (map.getLayer(id)) {
          map.setLayoutProperty(id, 'text-size', [
            'interpolate', ['linear'], ['zoom'],
            13, 12,
            15, 15,
            17, 20,
            19, 28,
          ])
        }
      })
      setMapLanguage(map, 'vi')
  }}
    >
      <NavigationControl position="top-right" />
      {points.map((p, i) => (
        <Marker
          key={i}
          longitude={p.lng}
          latitude={p.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation() // tránh bấm marker lại tạo thêm điểm
            setSelected(i)
          }}
        />
      ))}

      {selected !== null && points[selected] && (
        <Popup
          longitude={points[selected].lng}
          latitude={points[selected].lat}
          anchor="top"
          onClose={() => setSelected(null)}
        >
          {points[selected].lat.toFixed(5)}, {points[selected].lng.toFixed(5)}
        </Popup>
      )}
    </MapGL>
  )
}

function setMapLanguage(map: MaplibreMap, lang: string) {
  map.getStyle().layers.forEach((layer) => {
    if (layer.type !== 'symbol') return
    const textField = layer.layout?.['text-field']
    // Chỉ đụng vào các lớp nhãn dùng trường tên (bỏ qua biển số đường, số hiệu...)
    if (!textField || !JSON.stringify(textField).includes('name_en')) return

    map.setLayoutProperty(layer.id, 'text-field', [
      'coalesce',
      ['get', `name:${lang}`], // tên theo ngôn ngữ chọn
      ['get', 'name_en'],      // dự phòng: tiếng Anh
      ['get', 'name'],         // dự phòng cuối: tên địa phương
    ])
  })
}