import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [events, setEvents] = useState(null);

  useEffect(() => {

    const getEvents = async () => {
      const req = await fetch("https://funzippy.com/event/search?csrftkn=kmdDO", {
        method: "post",
        body: JSON.stringify({
          "pageNo":1,
          "resultsPerPage":20,
          "radius":50,
          "dateRange":"",
          "name":"",
          "city":"",
          "category1":""
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await req.json();

      setEvents(data);
    }

    getEvents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          hey there
        </a>
      </header>
    </div>
  );
}

export default App;
