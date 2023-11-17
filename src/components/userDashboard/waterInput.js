import React, { useState } from 'react';

const WaterInputModal = () => {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('fl oz'); // Default unit

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSubmit = () => {
    // Replace 'YOUR_BACKEND_API_URL' with the actual backend API endpoint
    fetch('YOUR_BACKEND_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, unit }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., display a success message
        console.log(data);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error(error);
      });
  };

  return (
    <div style={styles.div}>
      <h2 style={styles.h2}>Today's Water Intake</h2>
      <label style={styles.label1}>
        AMOUNT OF WATER
        <input style={styles.input}
          type="number"
          step="0.01"
          value={amount}
          onChange={handleAmountChange}
        />
      </label>
      <label style={styles.label2}>
        MEASUREMENT
        <select value={unit} onChange={handleUnitChange} style={styles.select}>
          <option value="fl oz">fl oz</option>
          <option value="cups">cups</option>
          <option value="gallons">gallons</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const styles = {
  div: {
    width: "500px",
    height: "250px",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },

  h2: {
    color: "#000",
    fontSize: "36px",
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: "normal",
  },

  label1: {
    color: "#000",
    fontSize: "20px",
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: "normal",
    position: "absolute",
    left:"0px"
  },

  input: {
    width: "257px",
    height: "45px",
    borderRadius: "10px",
    background: "#D9D9D9",
    position: "relative",
    left: "-240px",
    bottom: "-30px"
  },

  label2: {
    color: "#000",
    fontSize: "20px",
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: "normal",
    position: "absolute",
    right:"-100px"
  },

  select: {
    width: "174px",
    height: "45px",
    borderRadius: "10px",
    background: "#D9D9D9",
    position: "relative",
    right: "165px",
    bottom: "-30px"
  }
};
export default WaterInputModal;
