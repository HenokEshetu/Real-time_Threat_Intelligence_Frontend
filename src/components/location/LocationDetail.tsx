import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocationDetail } from '../../hooks/useLocation';

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLocationDetail(id!);
  const loc = data?.getLocation;

  if (loading) return <div>Loading...</div>;
  if (!loc) return <div>Not found</div>;

  return (
    <div>
      <h2>{loc.name}</h2>
      <p><b>Type:</b> {loc.type}</p>
      <p><b>Country:</b> {loc.country}</p>
      <p><b>City:</b> {loc.city}</p>
      <p><b>Description:</b> {loc.description}</p>
      <p><b>Latitude:</b> {loc.latitude}</p>
      <p><b>Longitude:</b> {loc.longitude}</p>
      <Link to={`/locations/${loc.id}/edit`}>Edit</Link>
      <br />
      <Link to="/locations">Back to list</Link>
    </div>
  );
};

export default LocationDetail;
