import React from 'react';
import './App.css';
import Pagination from "./components/Pagination"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyDetails from './components/PropertyDetails';
import mockData from './components/mockData';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Pagination />} />
          <Route path="/property/:id" element={<PropertyDetails properties={mockData} />} />
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
