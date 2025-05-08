import React, { useMemo, useState } from "react";
import countriesDataRaw from "./countries.json";
import countriesGeoJsonRaw from "./countries.json";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FeatureCollection, Feature, Geometry } from "geojson";

// Add types for country feature
type CountryFeature = Feature<Geometry, {
  NAME: string;
  ISO2: string;
  ISO3: string;
  // ...other properties...
}>;
type CountriesData = FeatureCollection<Geometry, CountryFeature["properties"]>;

// Cast imported data to the correct type
const countriesData = countriesDataRaw as CountriesData;
const countriesGeoJson = countriesGeoJsonRaw as CountriesData;

// Helper to get flag emoji from ISO2 code
function getFlagEmoji(iso2: string) {
  if (!iso2 || iso2.length !== 2) return "🏳️";
  return String.fromCodePoint(...[...iso2.toUpperCase()].map(c => 0x1f1e6 - 65 + c.charCodeAt(0)));
}

// Format date for display
function formatDate(date: string | number | Date) {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// Simulate original and modification dates for demo
function getOriginalDate() {
  return "2023-08-22T14:01:44Z";
}
function getModificationDate() {
  // Randomize for demo
  const dates = [
    "2024-07-23T00:00:00Z", "2024-08-07T00:00:00Z", "2024-05-10T00:00:00Z",
    "2024-03-18T00:00:00Z", "2024-04-18T00:00:00Z", "2023-10-18T00:00:00Z"
  ];
  return dates[Math.floor(Math.random() * dates.length)];
}

// Helper to get centroid for a country feature (Polygon/MultiPolygon)
function getFeatureCentroid(feature: any): [number, number] {
  if (!feature?.geometry) return [20, 0];
  const geom = feature.geometry;
  let coords: any[] = [];
  if (geom.type === "Polygon") {
    coords = geom.coordinates[0];
  } else if (geom.type === "MultiPolygon") {
    coords = geom.coordinates[0][0];
  }
  if (coords.length) {
    const lats = coords.map(c => c[1]);
    const lons = coords.map(c => c[0]);
    return [
      lats.reduce((a, b) => a + b, 0) / lats.length,
      lons.reduce((a, b) => a + b, 0) / lons.length,
    ];
  }
  return [20, 0];
}

// Style function for GeoJSON: highlight only the selected country
function countryStyle(feature: any, selectedISO3: string) {
  if (feature.properties.ISO3 === selectedISO3) {
    return {
      color: '#00bfff',
      weight: 2,
      fillColor: '#00bfff',
      fillOpacity: 0.4,
    };
  }
  return {
    color: '#3b82f6',
    weight: 1,
    fillColor: '#22223b',
    fillOpacity: 0.1,
  };
}

// Helper to get GeoJSON for a single country by ISO2/ISO3
function getCountryGeoJson(iso2: string, iso3: string): FeatureCollection {
  const features = (countriesGeoJson.features || []).filter(
    (f: any) =>
      f.properties.ISO2 === iso2 || f.properties.ISO3 === iso3
  );
  return {
    type: "FeatureCollection",
    features,
  };
}

export default function Countries() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<null | typeof countries[0]>(null);

  // Flatten features for table
  const countries = useMemo(() => {
    return (countriesData.features || []).map((f: CountryFeature) => ({
      name: f.properties.NAME,
      iso2: f.properties.ISO2,
      iso3: f.properties.ISO3,
      originalDate: getOriginalDate(),
      modificationDate: getModificationDate(),
      stixId: `location--${crypto.randomUUID()}`,
    }));
  }, []);

  // Filter and sort
  const filtered = useMemo(() => {
    let arr = countries;
    if (search) {
      arr = arr.filter((c: typeof countries[0]) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.iso2?.toLowerCase().includes(search.toLowerCase()) ||
        c.iso3?.toLowerCase().includes(search.toLowerCase())
      );
    }
    arr = arr.sort((a: typeof countries[0], b: typeof countries[0]) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return arr;
  }, [countries, search, sortAsc]);

  // Download as CSV
  function downloadCSV() {
    const header = "Name,ISO2,ISO3,Original Creation Date,Modification Date\n";
    const rows = filtered.map((c: typeof countries[0]) =>
      [c.name, c.iso2, c.iso3, formatDate(c.originalDate), formatDate(c.modificationDate)].join(",")
    );
    const blob = new Blob([header + rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "countries.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function CountryDetailPage({ country, onBack }: { country: typeof countries[0], onBack: () => void }) {
    const [tab, setTab] = useState("overview");
    // Demo aliases and creators
    const aliases = [country.name, `EGY`, `EG`, `Arab Republic of ${country.name}`];
    const creators = ["*** REDACTED ***", "*** REDACTED ***", "*** REDACTED ***", "*** REDACTED ***"];
    // Find the country feature by ISO3
    const feature = (countriesGeoJsonRaw as any).features.find(
      (f: any) => f.properties.ISO3 === country.iso3
    );
    const centroid = getFeatureCentroid(feature);

    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-800">
          <div>
            <div className="text-xs text-zinc-400">
              Locations / <span className="text-blue-400">Countries</span> / <span className="text-zinc-200">{country.name}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl">{getFlagEmoji(country.iso2)}</span>
              <span className="text-3xl font-bold">{country.name}</span>
              <span className="ml-3 flex gap-2">
                <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs">{country.iso2}</span>
                <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs">{country.iso3}</span>
                {aliases.slice(2).map((alias, i) => (
                  <span key={i} className="bg-zinc-800 px-2 py-0.5 rounded text-xs">{alias}</span>
                ))}
                <button className="ml-1 px-1 rounded bg-zinc-700 text-zinc-200 text-xs" title="Add alias">+</button>
              </span>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">0 SUBSCRIBERS</span>
            <button className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200" title="Export">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16V4h-1v12H8l4 4 4-4h-3zm-7 2v2h14v-2H5z"/></svg>
            </button>
            <button className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200" title="Subscribe">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9zm0-2c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1-5h2v2h-2zm0-8h2v6h-2z"/></svg>
            </button>
            <button className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200" title="AI Insights">
              <span className="text-xs">AI INSIGHTS</span>
            </button>
            <button
              className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              onClick={onBack}
              title="Back"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="overview" value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex gap-2 bg-transparent px-8 pt-4 border-b border-zinc-800">
              {["overview", "knowledge", "content", "analyses", "sightings", "data", "history"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="uppercase font-normal tracking-wider text-[14px] px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-400 hover:text-blue-400"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                {/* Left: Mini Map */}
                <div>
                  <div className="text-xs text-zinc-400 mb-2">
                    MINI MAP (lat. {centroid[0]}, long. {centroid[1]})
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900" style={{ minHeight: 400 }}>
                    <MapContainer
                      center={centroid}
                      zoom={5}
                      style={{ width: "100%", height: 400, borderRadius: "0.5rem" }}
                      scrollWheelZoom={true}
                      dragging={true}
                      doubleClickZoom={true}
                      zoomControl={true}
                      attributionControl={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <GeoJSON
                        data={countriesGeoJsonRaw as any}
                        style={feature => countryStyle(feature, country.iso3)}
                      />
                    </MapContainer>
                  </div>
                </div>
                {/* Right: Basic Information */}
                <div>
                  <div className="text-xs text-zinc-400 mb-2">BASIC INFORMATION</div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-3">
                    <div>
                      <span className="font-semibold">Marking</span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">TLP:CLEAR</div>
                    </div>
                    <div>
                      <span className="font-semibold">Processing status</span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">DISABLED</div>
                    </div>
                    <div>
                      <span className="font-semibold">Revoked</span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-green-900 text-xs">NO</div>
                    </div>
                    <div>
                      <span className="font-semibold">Author</span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">*** REDACTED ***</div>
                    </div>
                    <div>
                      <span className="font-semibold">Reliability <span className="text-xs text-zinc-400">(of author)</span></span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">Unknown</div>
                    </div>
                    <div>
                      <span className="font-semibold">Confidence level</span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-green-900 text-xs">1 - Confirmed b...</div>
                    </div>
                    <div>
                      <span className="font-semibold">Labels</span>
                      <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">- <button className="ml-1 px-1 rounded bg-zinc-700 text-zinc-200 text-xs" title="Add label">+</button></div>
                    </div>
                    <div>
                      <span className="font-semibold">Platform creation date</span>
                      <div className="ml-2 text-xs">{formatDate("2023-10-18T02:33:21Z")} at 2:33:21 AM</div>
                    </div>
                    <div>
                      <span className="font-semibold">Creators</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {creators.map((c, i) => (
                          <span key={i} className="bg-zinc-800 px-2 py-1 rounded text-xs">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Standard STIX ID</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          className="bg-zinc-800 px-2 py-1 rounded text-xs w-full"
                          value={country.stixId}
                          readOnly
                        />
                        <button
                          className="p-1 rounded bg-zinc-800 hover:bg-zinc-700"
                          onClick={() => navigator.clipboard.writeText(country.stixId)}
                          title="Copy STIX ID"
                        >
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 18H8V7h11v16z"/></svg>
                        </button>
                        <button
                          className="p-1 rounded bg-zinc-800 hover:bg-zinc-700"
                          title="Edit STIX ID"
                        >
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Original creation date</span>
                      <div className="ml-2 text-xs">{formatDate(country.originalDate)} at 2:01:44 PM</div>
                    </div>
                    <div>
                      <span className="font-semibold">Modification date</span>
                      <div className="ml-2 text-xs">{formatDate(country.modificationDate)} at 2:37:15 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="knowledge">
              <div className="p-8 text-zinc-400">No knowledge content yet.</div>
            </TabsContent>
            <TabsContent value="content">
              <div className="p-8 text-zinc-400">No content yet.</div>
            </TabsContent>
            <TabsContent value="analyses">
              <div className="p-8 text-zinc-400">No analyses yet.</div>
            </TabsContent>
            <TabsContent value="sightings">
              <div className="p-8 text-zinc-400">No sightings yet.</div>
            </TabsContent>
            <TabsContent value="data">
              <div className="p-8 text-zinc-400">No data yet.</div>
            </TabsContent>
            <TabsContent value="history">
              <div className="p-8 text-zinc-400">No history yet.</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (selected) {
    return <CountryDetailPage country={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400">Locations / <span className="text-zinc-200">Countries</span></div>
          <div className="text-2xl font-bold">Countries</div>
        </div>
        <button
          className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
          onClick={downloadCSV}
          title="Download CSV"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16V4h-1v12H8l4 4 4-4h-3zm-7 2v2h14v-2H5z"/></svg>
        </button>
      </div>
      <div className="flex items-center gap-2 px-6 py-3">
        <input
          className="bg-zinc-800 text-zinc-100 px-3 py-2 rounded w-64 text-sm outline-none"
          placeholder="Search these results..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="ml-2 px-3 py-2 rounded bg-zinc-800 text-zinc-300 text-xs"
          onClick={() => setSortAsc(a => !a)}
        >
          Sort: {sortAsc ? "A-Z" : "Z-A"}
        </button>
        <span className="ml-auto text-xs text-zinc-400">{filtered.length} entit{filtered.length === 1 ? "y" : "ies"}</span>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-800 text-zinc-400">
              <th className="text-left px-6 py-2 font-normal">NAME</th>
              <th className="text-left px-6 py-2 font-normal">ORIGINAL CREATION DATE</th>
              <th className="text-left px-6 py-2 font-normal">MODIFICATION DATE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c: typeof countries[0], i: number) => (
              <tr
                key={c.iso3}
                className={(i % 2 === 1 ? "bg-zinc-900" : "bg-zinc-950") + " cursor-pointer hover:bg-zinc-800"}
                onClick={() => setSelected(c)}
              >
                <td className="px-6 py-2 flex items-center gap-2">
                  <span className="text-xl">{getFlagEmoji(c.iso2)}</span>
                  <span>{c.name}</span>
                </td>
                <td className="px-6 py-2">{formatDate(c.originalDate)}</td>
                <td className="px-6 py-2">{formatDate(c.modificationDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
