// src/components/Chart/LineChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme, alpha } from '@mui/material';

// Rejestracja komponentów ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ 
  title, 
  subtitle, 
  data, 
  labels, 
  height = 300, 
  showLegend = true,
  showGrid = true,
  fill = true,
  tension = 0.4
}) => {
  const theme = useTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 12,
        },
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        callbacks: {
          // Możliwość dodania własnych formatów danych w tooltipie
        },
        // Glassmorphism effect
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
      },
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: alpha(theme.palette.divider, 0.1),
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
          color: theme.palette.text.secondary,
        },
      },
      y: {
        grid: {
          display: showGrid,
          color: alpha(theme.palette.divider, 0.1),
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
          color: theme.palette.text.secondary,
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: tension,
        borderWidth: 2,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
      },
      point: {
        radius: 3,
        hoverRadius: 5,
        borderWidth: 2,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  // Pastelowe kolory dla wykresów
  const defaultColors = [
    '#6a98e8', // Pastelowy niebieski
    '#7cb083', // Pastelowy zielony
    '#b39ddb', // Pastelowy fioletowy
    '#ffb74d', // Pastelowy pomarańczowy
    '#f06292', // Pastelowy różowy
    '#64b5f6', // Jasny niebieski
    '#81c784', // Jasny zielony
  ];

  const chartData = {
    labels,
    datasets: data.map((dataset, index) => {
      const color = dataset.color || defaultColors[index % defaultColors.length];
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: color,
        backgroundColor: fill 
          ? alpha(color, 0.2)
          : color,
        fill: fill,
        pointBackgroundColor: color,
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        lineTension: tension,
        borderWidth: 2,
      };
    }),
  };

  return (
    <Card sx={{ 
      background: alpha(theme.palette.background.paper, 0.7),
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    }}>
      {title && (
        <>
          <CardHeader 
            title={title} 
            subheader={subtitle} 
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
          />
          <Divider sx={{ opacity: 0.1 }} />
        </>
      )}
      <CardContent>
        <Box sx={{ height, position: 'relative' }}>
          <Line options={options} data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;
