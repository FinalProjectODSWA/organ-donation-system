import React, { useEffect, useState } from 'react';

const DonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/donors')
      .then(response => response.json())
      .then(data => setDonors(data))
      .catch(err => console.error('Error fetching donors:', err));
  }, []);

  return (
    <div>
      <h2>Registered Donors</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Type</th>
            <th>Organ</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.name}</td>
              <td>{donor.age}</td>
              <td>{donor.bloodType}</td>
              <td>{donor.organ}</td>
              <td>{donor.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorList;
