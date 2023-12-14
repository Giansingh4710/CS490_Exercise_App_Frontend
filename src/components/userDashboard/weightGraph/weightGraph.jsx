import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine } from 'recharts';

const WeightGraph = () => {
  const [weightData, setWeightData] = useState([]);
  const weightGoal = 140; // Set a default weight goal

  useEffect(() => {
    // Fetch weight data from the backend
    const fetchWeightData = async () => {
      try {
        const response = await apiClient.dailyWeight();
        setWeightData(response.data);
      } catch (error) {
        console.error('Error fetching weight data:', error);
      }
    };

    fetchWeightData();
  }, []);

  const renderGoalLine = () => {
    if (!weightData.length || isNaN(weightGoal)) {
      return null;
    }

    return <ReferenceLine y={weightGoal} label="Weight Goal" stroke="red" strokeDasharray="3 3" />;
  };

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
