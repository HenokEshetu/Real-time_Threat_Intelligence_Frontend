import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LocationMiniMap from "@/components/common/location/LocationMiniMap";

interface CityFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    city: string;
    city_ascii?: string;
    country: string;
    iso2: string;
    iso3: string;
    admin_name: string;
    capital: string;
    population: number;
    lat: number;
    lng: number;
    [key: string]: any;
  };
}

const CityOverview: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [city, setCity] = useState<CityFeature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "/src/pages/Location/worldcities.geojson";
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load city data");
        return res.json();
      })
      .then(data => {
        const match = data.features.find(
          (f: any) => {
            const cityAscii = f.properties.city_ascii || f.properties.city;
            return (
              encodeURIComponent(cityAscii).toLowerCase() === (cityName || '').toLowerCase() ||
              cityAscii.toLowerCase() === decodeURIComponent(cityName || '').toLowerCase()
            );
          }
        );
        setCity(match || null);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [cityName]);

  if (loading) return <div className="text-center py-10">Loading city details...</div>;
  if (error || !city)
    return (
      <div className="text-center py-10 text-red-600">
        {error ? `Error: ${error}` : "City not found."}
        <div>
          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate("/location/cities")}
          >
            Back to Cities
          </button>
        </div>
      </div>
    );

  const { properties } = city;
  const marker = {
    id: properties.city_ascii || properties.city,
    position: [properties.lat, properties.lng] as [number, number],
    label: properties.city_ascii || properties.city,
    type: "default" as const,
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* Left: Map */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-2 text-xs text-zinc-400">
          MINI MAP (Lat. {properties.lat}, Long. {properties.lng})
        </div>
        <div className="relative w-full" style={{ aspectRatio: '3/2', minHeight: 320 }}>
          <div className="absolute inset-0 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <LocationMiniMap
              markers={[marker]}
              zoom={8}
              width="100%"
              height="100%"
              darkMode={true}
              withExport={false}
              withSearch={false}
              withFullscreen={false}
            />
          </div>
        </div>
      </div>
      {/* Right: Basic Information */}
      <div className="w-[480px] p-6 border-l border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
            onClick={() => navigate("/location/cities")}
            title="Back"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <span className="text-3xl">🏙️</span>
          <span className="text-2xl font-bold">{properties.city_ascii || properties.city}</span>
        </div>
        <div className="text-sm text-zinc-400 mb-2">{properties.admin_name}, {properties.country}</div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Country</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.country}</div>
          </div>
          <div>
            <span className="font-semibold">Admin Area</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.admin_name}</div>
          </div>
          <div>
            <span className="font-semibold">Capital</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.capital || "—"}</div>
          </div>
          <div>
            <span className="font-semibold">Population</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">
              {properties.population ? Number(properties.population).toLocaleString() : "—"}
            </div>
          </div>
          <div>
            <span className="font-semibold">Latitude</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.lat}</div>
          </div>
          <div>
            <span className="font-semibold">Longitude</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.lng}</div>
          </div>
          <div>
            <span className="font-semibold">ISO2</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.iso2}</div>
          </div>
          <div>
            <span className="font-semibold">ISO3</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{properties.iso3}</div>
          </div>
          <div>
            <span className="font-semibold">STIX ID</span>
            <div className="ml-2 text-xs break-all">location--city--{(properties.city_ascii || properties.city).toLowerCase().replace(/\s+/g, "-")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityOverview;
