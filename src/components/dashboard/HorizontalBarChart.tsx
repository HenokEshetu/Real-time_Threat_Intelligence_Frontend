import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface HorizontalBarChartProps {
  series: ApexAxisChartSeries;
  categories: string[];
  total?: boolean;
  legend?: boolean;
  withExport?: boolean;
  width?: string;
  height?: string;
  title?: string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  series,
  categories,
  total = false,
  legend = true,
  withExport = true,
  width = '100%',
  height = '450px',
  title = 'Horizontal Bar Chart',
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const colorPalette = [
    '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', 
    '#4895ef', '#560bad', '#f77f00', '#d62828', '#06d6a0'
  ];

  const generateGradients = (colors: string[]) => {
    return colors.map(color => ({
      shade: 'light',
      type: 'gradient',
      gradientToColors: [color], // Explicitly define the type
      shadeIntensity: 0.8,
      opacityFrom: 0.9,
      opacityTo: 0.7,
      stops: [0, 90, 100],
    }));
  };

  const options: ApexOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      toolbar: {
        show: withExport,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        export: {
          svg: {
            filename: title.replace(/\s+/g, '_').toLowerCase(),
          },
          png: {
            filename: title.replace(/\s+/g, '_').toLowerCase(),
          },
        },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 450,
        },
      },
      events: {
        animationEnd: () => {
          setAnimationComplete(true);
        },
        mouseMove: (event, chartContext, config) => {
          if (config.dataPointIndex !== -1) {
            setHoveredBar(config.dataPointIndex);
          } else {
            setHoveredBar(null);
          }
        },
        mounted: (chart) => {
          setChartInstance(chart);
        },
      },
      fontFamily: 'Poppins, Arial, sans-serif',
      background: '#ffffff',
      foreColor: '#333333',
    },
    title: {
      text: title,
      align: 'center',
      margin: 15,
      offsetY: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false,
        dataLabels: {
          position: 'top',
        },
        borderRadius: 8,
        barHeight: '60%',
        columnWidth: '70%',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.2,
        gradientToColors: undefined as string[] | undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 1,
        stops: [0, 50, 100],
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 5,
      style: {
        fontSize: '13px',
        fontFamily: 'Poppins, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#ffffff'],
      },
      formatter: function(val: number, opts: any) {
        return val.toLocaleString();
      },
      background: {
        enabled: false,
      }
    },
    stroke: {
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 5,
        right: 0,
        bottom: 5,
        left: 10
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '13px',
          fontFamily: 'Poppins, Arial, sans-serif',
          fontWeight: 500,
          colors: Array(categories.length).fill('#455a64'),
        },
      },
      axisBorder: {
        show: true,
        color: '#78909c',
      },
      axisTicks: {
        show: true,
        color: '#78909c',
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '13px',
          fontFamily: 'Poppins, Arial, sans-serif',
          fontWeight: 500,
        },
        maxWidth: 160,
      },
    },
    legend: {
      show: legend,
      position: 'top',
      horizontalAlign: 'center',
      offsetY: -10,
      fontSize: '14px',
      fontFamily: 'Poppins, Arial, sans-serif',
      markers: {
        size: 12, // Use `size` instead of `width` and `height`
        strokeWidth: 0, // Optional: Add stroke width
        fillColors: colorPalette, // Optional: Add fill colors
        shape: 'circle', // Optional: Define shape
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins, Arial, sans-serif',
      },
      y: {
        formatter: (val) => `${val.toLocaleString()}`,
        title: {
          formatter: (seriesName) => `${seriesName}:`,
        },
      },
      marker: {
        show: true,
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const category = w.globals.labels[dataPointIndex];
        const seriesName = w.globals.seriesNames[seriesIndex];
        
        return `
          <div class="apexcharts-tooltip-box" style="padding: 8px; background: rgba(255, 255, 255, 0.96); border: 1px solid #eee; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 4px; font-family: Poppins, Arial, sans-serif;">
            <div style="font-weight: bold; margin-bottom: 5px; color: #333;">${category}</div>
            <div style="color: ${w.globals.colors[dataPointIndex]}; font-size: 14px;">
              <span style="font-weight: 500;">${seriesName}: </span>
              <span style="font-weight: bold;">${value.toLocaleString()}</span>
            </div>
          </div>
        `;
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.08,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.35,
        },
      },
    },
    colors: colorPalette,
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: categories.length * 50 + 100,
          },
          plotOptions: {
            bar: {
              barHeight: '75%',
              borderRadius: 4,
            },
          },
          dataLabels: {
            offsetX: 0,
            style: {
              fontSize: '11px',
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '11px',
              },
            },
          },
        },
      },
    ],
  }), [categories, legend, title, withExport]);

  useEffect(() => {
    if (chartInstance && animationComplete) {
      const barElements = document.querySelectorAll('.apexcharts-bar-area');
      
      barElements.forEach((bar, index) => {
        bar.addEventListener('mouseenter', () => {
          barElements.forEach((b, i) => {
            if (i !== index) {
              b.setAttribute('opacity', '0.6');
            } else {
              b.setAttribute('opacity', '1');
            }
          });
        });
        
        bar.addEventListener('mouseleave', () => {
          barElements.forEach((b) => {
            b.setAttribute('opacity', '1');
          });
        });
      });
    }
  }, [chartInstance, animationComplete]);

  return (
    <div className="chart-container" style={{
      position: 'relative',
      padding: '15px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      margin: '15px 0',
      transition: 'all 0.3s ease',
    }}>
      <Chart 
        options={options} 
        series={series} 
        type="bar" 
        width={width} 
        height={height} 
      />
      
      {withExport && (
        <div className="chart-controls" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '15px',
          gap: '10px'
        }}>
          <button
            onClick={() => {
              if (chartInstance) {
                chartInstance.exportToSVG();
              }
            }}
            style={{
              backgroundColor: '#4361ee',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#3a0ca3';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#4361ee';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export SVG
          </button>
          <button
            onClick={() => {
              if (chartInstance) {
                chartInstance.exportToPNG();
              }
            }}
            style={{
              backgroundColor: '#7209b7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#560bad';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#7209b7';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export PNG
          </button>
        </div>
      )}
    </div>
  );
};

export default HorizontalBarChart;