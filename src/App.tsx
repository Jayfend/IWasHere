import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Sửa lỗi icon marker không hiện khi dùng bundler
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function ClickToAdd({ onAdd }: { onAdd: (latlng: LatLng) => void }) {
  useMapEvents({ click: (e) => onAdd(e.latlng) })
  return null
}

export default function App() {
  const [points, setPoints] = useState<LatLng[]>([])

  return (
    <MapContainer center={[10.7769, 106.7009]} zoom={13} style={{ height: '100%' }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      <ClickToAdd onAdd={(latlng) => setPoints((p) => [...p, latlng])} />
      {points.map((p, i) => (
        <Marker key={i} position={p}>
          <Popup>
            {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}