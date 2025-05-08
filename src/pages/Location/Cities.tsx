import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Landmark } from "lucide-react";

interface CityFeature {
  properties: {
    city: string;
    city_ascii?: string;
    country: string;
    [key: string]: any;
  };
}

const Cities: React.FC = () => {
  const [cities, setCities] = useState<CityFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/src/pages/Location/worldcities.geojson")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load city data");
        return res.json();
      })
      .then((data) => {
        setCities(data.features);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Filtering and sorting
  const filteredCities = useMemo(() => {
    let filtered = cities;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (city) =>
          (city.properties.city_ascii || city.properties.city)
            .toLowerCase()
            .includes(q) ||
          (city.properties.country || "")
            .toLowerCase()
            .includes(q)
      );
    }
    filtered = [...filtered].sort((a, b) => {
      const aName = (a.properties.city_ascii || a.properties.city).toLowerCase();
      const bName = (b.properties.city_ascii || b.properties.city).toLowerCase();
      return sortAsc ? aName.localeCompare(bName) : bName.localeCompare(aName);
    });
    return filtered;
  }, [cities, search, sortAsc]);

  // Download CSV
  const handleDownload = () => {
    const rows = [
      ["City", "Country"],
      ...filteredCities.map((city) => [
        city.properties.city_ascii || city.properties.city,
        city.properties.country,
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cities.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#161b22] rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#21262d]">
            <div>
              <span className="text-xs font-semibold text-gray-400 tracking-widest">Cities</span>
            </div>
            <button
              className="p-2 rounded hover:bg-[#21262d] transition"
              title="Download CSV"
              onClick={handleDownload}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>
          {/* Filter/Sort Controls */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-[#21262d] bg-[#161b22]">
            <input
              className="flex-1 bg-[#21262d] text-gray-100 px-3 py-2 rounded focus:outline-none"
              placeholder="Search these results..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-3 py-2 rounded bg-[#21262d] text-gray-200 hover:bg-[#23272e] transition flex items-center gap-1"
              onClick={() => setSortAsc((v) => !v)}
              title={`Sort: ${sortAsc ? "A-Z" : "Z-A"}`}
            >
              Sort: {sortAsc ? "A-Z" : "Z-A"}
            </button>
            <span className="text-xs text-gray-400 ml-2">{filteredCities.length} entities</span>
          </div>
          {/* List */}
          <div className="divide-y divide-[#21262d]">
            {loading && (
              <div className="text-center text-gray-400 py-8">Loading cities...</div>
            )}
            {error && (
              <div className="text-center text-red-500 py-8">{error}</div>
            )}
            {!loading && !error && filteredCities.map((city, idx) => (
              <button
                key={city.properties.city_ascii || city.properties.city}
                className="w-full flex items-center gap-3 px-6 py-4 bg-transparent hover:bg-[#21262d] transition-colors text-left focus:outline-none"
                onClick={() =>
                  navigate(
                    `/location/cities/${encodeURIComponent(city.properties.city_ascii || city.properties.city)}`
                  )
                }
              >
                <Landmark className="w-5 h-5 text-cyan-400 opacity-80" />
                <span className="text-base text-gray-100 font-medium">
                  {city.properties.city_ascii || city.properties.city}
                </span>
                <span className="ml-auto text-xs text-gray-400">{city.properties.country}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          body {
            background: #0d1117;
          }
        `}
      </style>
    </div>
  );
};

export default Cities;
