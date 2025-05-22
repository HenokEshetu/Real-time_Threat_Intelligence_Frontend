import React from "react";

interface LocationsListProps {
  initialType: string;
}

const LocationsList: React.FC<LocationsListProps> = ({ initialType }) => {
  return <div>Locations List Page - Type: {initialType}</div>;
};

export default LocationsList;
