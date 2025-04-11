import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReceiverList() {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/receivers')
      .then(response => setReceivers(response.data))
      .catch(error => console.error('Error fetching receivers:', error));
  }, []);

  return (
    <div>
      <h2>Receiver List</h2>
      <ul>
        {receivers.map((receiver) => (
          <li key={receiver._id}>
            {receiver.name} - {receiver.age} - {receiver.bloodType} - {receiver.organNeeded}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReceiverList;
