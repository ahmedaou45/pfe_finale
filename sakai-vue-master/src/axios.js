// fetchData.js
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/app/config', {
      params: {
        app_name: 'ChitChat_Chrome_Ext',
        app_version: '4.12.1',
        tz_name: 'Africa/Algiers',
      },
    });

    console.log('Config Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching config:', error);
    throw error;
  }
}

// Usage example:
fetchData().then(data => {
  // Handle data here
}).catch(error => {
  // Handle error here
});
