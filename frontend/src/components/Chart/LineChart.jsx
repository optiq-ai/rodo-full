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
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';

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
  fill = false,
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
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
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
      },
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: theme.palette.divider,
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
          color: theme.palette.divider,
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
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  };

  const chartData = {
    labels,
    datasets: data.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color || theme.palette.primary.main,
      backgroundColor: fill 
        ? `${dataset.color || theme.palette.primary.main}15` 
        : dataset.color || theme.palette.primary.main,
      fill: fill,
      pointBackgroundColor: dataset.color || theme.palette.primary.main,
      pointBorderColor: theme.palette.background.paper,
      pointBorderWidth: 2,
    })),
  };

  return (
    <Card>
      {title && (
        <>
          <CardHeader 
            title={title} 
            subheader={subtitle} 
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
          />
          <Divider />
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
