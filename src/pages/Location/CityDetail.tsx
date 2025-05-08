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

const CityDetail: React.FC = () => {
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

  // Helper for badge
  const Badge = ({ children, color = "bg-blue-100 text-blue-800" }: { children: React.ReactNode, color?: string }) => (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{children}</span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 flex flex-col items-center justify-center py-8 px-2">
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left: Map */}
        <div className="flex-1 min-w-[320px] flex flex-col justify-center">
          <div className="mb-2 text-xs text-zinc-400 pl-2">Mini Map</div>
          <div className="rounded-2xl overflow-hidden border border-blue-100 dark:border-zinc-800 shadow-lg bg-white dark:bg-zinc-900" style={{ minHeight: 340 }}>
            <LocationMiniMap
              markers={[marker]}
              zoom={8}
              width="100%"
              height="340px"
              darkMode={true}
              withExport={false}
              withSearch={false}
              withFullscreen={false}
            />
          </div>
        </div>
        {/* Right: City Info Card */}
        <div className="w-full md:w-[420px] flex flex-col">
          <div className="relative bg-white/90 dark:bg-zinc-900/95 rounded-3xl shadow-2xl border border-blue-100 dark:border-zinc-800 px-8 pt-8 pb-6 flex flex-col items-center">
            {/* Back button */}
            <button
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full border border-blue-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 text-blue-700 dark:text-blue-200 text-sm font-semibold hover:bg-blue-50 hover:text-blue-900 transition"
              onClick={() => navigate("/location/cities")}
              title="Back"
            >
              &larr; Back
            </button>
            {/* City Avatar */}
            <div className="mb-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-5xl shadow-lg border-4 border-white dark:border-zinc-900">
                <span role="img" aria-label="city">🏙️</span>
              </div>
            </div>
            {/* City Name */}
            <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-100 tracking-tight mb-1 text-center">{properties.city_ascii || properties.city}</h1>
            {/* Country & Admin Area */}
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              <Badge color="bg-blue-100 text-blue-800">{properties.country}</Badge>
              <Badge color="bg-cyan-100 text-cyan-800">{properties.admin_name}</Badge>
              {properties.capital && <Badge color="bg-amber-100 text-amber-800">{properties.capital}</Badge>}
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full text-sm text-zinc-600 dark:text-zinc-300 mt-4 mb-2">
              <div className="flex items-center"><span className="mr-1">👥</span><b>Population:</b>&nbsp;{properties.population ? Number(properties.population).toLocaleString() : <span className="text-zinc-300">—</span>}</div>
              <div className="flex items-center"><span className="mr-1">🌐</span><b>ISO2:</b>&nbsp;{properties.iso2}</div>
              <div className="flex items-center"><span className="mr-1">🌐</span><b>ISO3:</b>&nbsp;{properties.iso3}</div>
              <div className="flex items-center"><span className="mr-1">🗺️</span><b>Lat:</b>&nbsp;{properties.lat}</div>
              <div className="flex items-center"><span className="mr-1">🗺️</span><b>Lng:</b>&nbsp;{properties.lng}</div>
              <div className="flex items-center"><span className="mr-1">🆔</span><b>STIX ID:</b>&nbsp;<span className="break-all">location--city--{(properties.city_ascii || properties.city).toLowerCase().replace(/\s+/g, "-")}</span></div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative background shapes */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-500 opacity-20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-cyan-200 to-blue-400 opacity-10 rounded-full blur-2xl animate-float-slow" />
      </div>
      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0) }
            50% { transform: translateY(-20px) }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-slow { animation: float 12s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default CityDetail;
