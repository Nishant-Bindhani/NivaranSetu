import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// illustrative sample pins only — no real ticket data exists yet (Tickets module
// isn't built). Centered on a real city so the map itself is real, the pins are not.
// category/label/status point into landing.json's mapShowcase.pins section;
// reportedAt stays a fixed display string, not translated (illustrative data only)
const SAMPLE_PINS = [
  { lat: 28.6139, lng: 77.209, color: '#ef4444', key: 'pothole', reportedAt: '29 Jul, 10:12 AM' },
  { lat: 28.6562, lng: 77.241, color: '#f59e0b', key: 'streetlight', reportedAt: '29 Jul, 7:40 AM' },
  { lat: 28.5679, lng: 77.171, color: '#0ea5e9', key: 'pipeLeak', reportedAt: '28 Jul, 6:05 PM' },
  { lat: 28.6692, lng: 77.163, color: '#22c55e', key: 'overflowingBin', reportedAt: '29 Jul, 9:15 AM' },
  { lat: 28.5729, lng: 77.266, color: '#0ea5e9', key: 'drainageBlocked', reportedAt: '29 Jul, 6:50 AM' },
]
const DELHI_CENTER: [number, number] = [28.6139, 77.209]

export function MapShowcase() {
  const { t: translate } = useTranslation('landing')

  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
              {translate('mapShowcase.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
              {translate('mapShowcase.title')}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {translate('mapShowcase.body')}
            </p>
          </div>

          <div className="relative isolate h-96 w-full overflow-hidden rounded-2xl border shadow-sm [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:rounded-2xl [&_.leaflet-control-attribution]:!bg-transparent [&_.leaflet-control-attribution]:!text-[9px] [&_.leaflet-pane]:!z-0 [&_.leaflet-top]:!z-10">
            <MapContainer
              center={DELHI_CENTER}
              zoom={11}
              minZoom={5}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {SAMPLE_PINS.map((pin, index) => (
                <CircleMarker
                  key={index}
                  center={[pin.lat, pin.lng]}
                  radius={9}
                  pathOptions={{ color: pin.color, fillColor: pin.color, fillOpacity: 0.8, weight: 2 }}
                >
                  <Tooltip permanent direction="top" offset={[0, -6]} className="!rounded-lg !border-0 !bg-zinc-900 !px-3 !py-2 !text-white !shadow-lg">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span className="size-2 rounded-full" style={{ backgroundColor: pin.color }} />
                      {translate(`mapShowcase.pins.${pin.key}.category`)}
                    </div>
                    <p className="mt-0.5 text-xs text-white/80">{translate(`mapShowcase.pins.${pin.key}.label`)}</p>
                    <p className="mt-1 text-[10px] tracking-wide text-white/50 uppercase">
                      {translate(`mapShowcase.pins.${pin.key}.status`)} · {pin.reportedAt}
                    </p>
                  </Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
