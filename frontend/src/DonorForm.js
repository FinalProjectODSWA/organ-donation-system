// DonorForm.js

import React, { useState } from 'react';
import axios from 'axios';

const DonorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodType: '',
    organ: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register-donor', formData);
      alert('✅ Donor registered successfully!');
      console.log(res.data);
      // Reset form
      setFormData({
        name: '',
        age: '',
        bloodType: '',
        organ: '',
        contact: ''
      });
    } catch (err) {
      alert('❌ Error registering donor. See console.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register as an Organ Donor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="bloodType"
          placeholder="Blood Type (e.g. O+)"
          value={formData.bloodType}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="organ"
          placeholder="Organ to Donate"
          value={formData.organ}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="contact"
          placeholder="Contact Email"
          value={formData.contact}
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Submit Donor Info</button>
      </form>
    </div>
  );
};

export default DonorForm;
