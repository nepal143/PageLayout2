import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import  mockData from './mockData.js' ;
console.log(mockData) ;
function App() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('London');
  const [city, setCity] = useState('London');
  const [propertiesPerPage, setPropertiesPerPage] = useState(6);
  const cardsPerRow = 3;


// const mockData1 = mockData



  

  useEffect(() => {
    // In a real application, you would fetch data from an API or another source here.
    // For this example, we're using mock data.
    setProperties(mockData);
  }, []);

  // Calculate the range of properties to display on the current page
  let filteredProperties = properties.filter((property) =>
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Calculate the number of rows
  const numRows = Math.ceil(currentProperties.length / cardsPerRow);

  // Filter Data Based on Search Query
  const numberOfPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const previousCityRef = useRef('London');
  filteredProperties = properties.filter((property) =>
  property.city.toLowerCase().includes(searchQuery.toLowerCase())
);
  const changeCity = (cityName) => {
    // Remove the class from the previous city
    document.getElementById(previousCityRef.current).classList.remove("city-active");

    // Set the new city and update the ref
    setCity(cityName);
    setSearchQuery(cityName)
    filteredProperties = properties.filter((property) =>
    property.city.toLowerCase().includes(searchQuery.toLowerCase())
  );
    previousCityRef.current = cityName;

    // Add the class to the new city
    document.getElementById(cityName).classList.add("city-active");
  };
  const showMore = () => {
    // Calculate the new number of properties to display
    const newPropertiesPerPage = propertiesPerPage + 3;

    // Update the propertiesPerPage state
    setPropertiesPerPage(newPropertiesPerPage);
  };
  const [selectedProperty, setSelectedProperty] = useState(null);

  // ... rest of your component code

  // Function to handle "Read More" click
  const handleReadMore = (property) => {
    setSelectedProperty(property);
  };
  return (
    <div className="App">
      <header>
        <div className="city-buttons">
<button id="New York" className='city' onClick={() => changeCity("New York")}>New York</button>
<button id="Mumbai" className='city' onClick={() => changeCity("Mumbai")}>Mumbai</button>
<button id="Paris" className='city' onClick={() => changeCity("Paris")}>Paris</button>
<button id="London" className='city city-active' onClick={() => changeCity("London")}>London</button>
</div>
      </header>
      <main>
        {/* Display properties */}
        <div className="property-list">
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <div key={rowIndex} className="card-row">
              {currentProperties
                .slice(
                  rowIndex * cardsPerRow,
                  rowIndex * cardsPerRow + cardsPerRow
                )
                .map((property) => (
                  <div key={property.id} className="property-card">
                    {/* Image on top */}
                    <div className="image-container">
                      <div className="rent">
                        <button className='for-rent'>For Rent</button>
                        <button className='heart'>💙</button>
                      </div>
                      <img src={property.imageUrl} alt={property.name} />
                    </div>
                    {/* Render property information */}
                    <div className="locatoin">
                      <div className="type">{property.type}</div>
                    </div>
                    <div className="property-name">
                      <h2>{property.name}</h2>
                    </div>
                    <div className="details">
                      <div className="top">
                        <p>{property.rooms} Rooms</p>
                        <p>{property.beds} Bed</p>
                        <p>{property.baths} Bath</p>
                        <p>{property.area} ft</p>
                      </div>
                      <div className="line"></div>
                        <div className="price"><p>
                            <span className='ammount'>${property.price}</span>/month</p>

                            <Link to={`/property/${property.id}`} className="read-more">Read More</Link>
                        </div>
                    </div>
                    {/* Add other property details here */}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="show-more-button">
            <button className='show-more' onClick={() => showMore()}>Show More</button>

        </div>
        
      </main>
    </div>
  );
}

export default App;