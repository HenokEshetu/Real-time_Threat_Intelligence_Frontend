import React, { useState } from 'react';
import { useLocationList } from '../../hooks/useLocation';
import { SearchLocationInput } from '../../types/location';
import { Link } from 'react-router-dom';

const LocationIndex: React.FC = () => {
  const [search, setSearch] = useState<SearchLocationInput>({});
  const { data, loading } = useLocationList(search);

  return (
    <div>
      <h2>Locations</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        style={{ marginBottom: 16 }}
      >
        <input
          placeholder="Search by name"
          value={search.name || ''}
          onChange={e => setSearch(s => ({ ...s, name: e.target.value }))}
        />
        <button type="submit">Search</button>
        <Link to="/locations/create" style={{ marginLeft: 16 }}>Create New</Link>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Country</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.searchLocations?.map((loc: any) => (
              <tr key={loc.id}>
                <td>
                  <Link to={`/locations/${loc.id}`}>{loc.name}</Link>
                </td>
                <td>{loc.type}</td>
                <td>{loc.country}</td>
                <td>{loc.city}</td>
                <td>
                  <Link to={`/locations/${loc.id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LocationIndex;
