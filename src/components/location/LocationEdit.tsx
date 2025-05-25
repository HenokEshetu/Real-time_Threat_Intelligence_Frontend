import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocationDetail, useUpdateLocation } from '../../hooks/useLocation';
import LocationForm from './LocationForm';
import { Loading } from '../common/Loading/Loading';

const LocationEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLocationDetail(id!);
  const [updateLocation] = useUpdateLocation();
  const navigate = useNavigate();
  const loc = data?.getLocation;

  if (loading) return <Loading />;
  if (!loc) return <div>Not found</div>;

  return (
    <div>
      <h2>Edit Location</h2>
      <LocationForm
        initial={loc}
        isEdit
        onSubmit={async (input) => {
          await updateLocation({ variables: { id, input } });
          navigate(`/locations/${id}`);
        }}
      />
    </div>
  );
};

export default LocationEdit;
