import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  x: string; // X-axis value (e.g., date)
  [key: string]: number | string | null; // Y-axis values for series
}

interface SeriesItem {
  name: string; // Name of the series
  data: Array<{ x: string; y: number }>; // Array of data points
  color: string; // Color for the series
}

interface WidgetMultiAreasProps {
  series: SeriesItem[]; // Array of series to plot
  interval: string; // Interval for the chart (e.g., 'day', 'month')
  isStacked: boolean; // Whether the chart is stacked
  hasLegend: boolean; // Whether the chart includes a legend
  withExport: boolean; // Whether the chart includes an export button
  readonly: boolean; // Whether the chart is readonly
}

const WidgetMultiAreas: React.FC<WidgetMultiAreasProps> = ({
  series,
  interval,
  isStacked,
  hasLegend,
  withExport,
  readonly,
}) => {
  // Normalize the data for the chart
  const normalizeData = () => {
    const allDates = Array.from(
      new Set(series.flatMap((serie) => serie.data.map((point) => point.x)))
    ).sort(); // Get all unique dates and sort them

    return allDates.map((date) => {
      const entry: DataPoint = { x: date };
      series.forEach((serie) => {
        const point = serie.data.find((p) => p.x === date);
        entry[serie.name] = point ? point.y : null; // Add value or null if missing
      });
      return entry;
    });
  };

  const chartData = normalizeData();

  // Function to handle exporting the chart as an SVG image
  const exportChart = () => {
    const svg = document.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render nothing if no data is provided
  if (!series || series.length === 0) {
    return <p>No data available to display.</p>;
  }

  return (
    <div className="relative">
      {/* Export button */}
      {withExport && !readonly && (
        <button
          onClick={exportChart}
          className="absolute top-2 right-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Export
        </button>
      )}

      {/* Responsive chart container */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          {/* Grid and Axes */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          {hasLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}

          {/* Render chart areas */}
          {series.map((s, i) => (
            <Area
              key={i}
              type="monotone"
              dataKey={s.name} // Use the series name as the dataKey
              name={s.name}
              stackId={isStacked ? 'a' : undefined}
              stroke={s.color}
              fill={`url(#gradient-${i})`}
            />
          ))}

          {/* Gradient definitions */}
          <defs>
            {series.map((s, i) => (
              <linearGradient key={i} id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.4} />
                <stop offset="75%" stopColor={s.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WidgetMultiAreas;