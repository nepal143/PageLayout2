import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
// import mockData  from './mockData';
function PropertyDetails({ properties }) {
  const { id } = useParams();
  const property = properties.find((property) => property.id === parseInt(id));

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div>
      {/* Display property details here */}
      {/* {console.log(property.imageUrl)} */}
      <div className="property-page">
      <h1>{property.name}</h1>

      </div>

      {/* Add other property details */}
    </div>
  );
}
export default PropertyDetails;