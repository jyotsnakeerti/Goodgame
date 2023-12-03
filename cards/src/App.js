import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Logo from '../src/assests/beerImg.png';
import SearchIcon from '@mui/icons-material/Search';

function App() {

  const [bottle, setBottle] = useState([]);
  const [searchBox, setSearchBox] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBottle(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchBox(e.target.value);
  };

  const lowercaseBeer = bottle.filter((bottles) =>
    bottles.name.toLowerCase().includes(searchBox.toLowerCase())
  );

  return (
    <div className='bg-container'>
      <div className='app'>
      <div className='navbar'>
        <div>
          <img src={Logo} className='logo' alt='logoImg'/>
        </div>
        <div className='searchBar'>
        <SearchIcon className='searchIcon'/>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="beer-container">
      {lowercaseBeer.length === 0 ? (
            <div className='no-results'>No match found.</div>
          ) : (
            lowercaseBeer.map((beer) => (
              <div key={beer.id} className='beer-card'>
                <img
                  src={beer.image_url}
                  alt={beer.name}
                  className='beer-image'
                />
                <div className='beer-details'>
                  <br />
                  <h3>{beer.name}</h3>
                  <p>{beer.tagline}</p>
                </div>
              </div>
            ))
          )}
      </div>
      </div>
    </div>
  );
}

export default App;
