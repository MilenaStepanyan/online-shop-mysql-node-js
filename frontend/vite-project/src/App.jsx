import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(response => response.text())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Response from Express API:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App
