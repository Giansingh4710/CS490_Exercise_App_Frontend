import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const WeightGraph = () => {
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    // Fetch weight data from the backend
    const fetchWeightData = async () => {
      try {
        const response = await apiClient.dailyweight();
        console.log('Response:', response);
        setWeightData(response.data);
      } catch (error) {
        console.error('Error fetching weight data:', error);
      }
    };

    fetchWeightData();
  }, []);

  // Updated to always return null
  const renderGoalLine = () => null;

  console.log('Final Weight Data:', weightData);

  return (
    <LineChart width={600} height={300} data={weightData}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="weight" name="Weight" stroke="#8884d8" />
      {renderGoalLine()}
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default WeightGraph;
