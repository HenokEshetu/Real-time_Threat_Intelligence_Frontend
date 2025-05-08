import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateLocation } from '../../hooks/useLocation';
import LocationForm from './LocationForm';

const LocationCreate: React.FC = () => {
  const [createLocation, { loading }] = useCreateLocation();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Create Location</h2>
      <LocationForm
        onSubmit={async input => {
          await createLocation({ variables: { input } });
          navigate('/locations');
        }}
      />
    </div>
  );
};

export default LocationCreate;
