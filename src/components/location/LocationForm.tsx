import React, { useState } from 'react';
import { LocationType, CreateLocationInput, UpdateLocationInput } from '../../types/location';

interface Props {
  initial?: Partial<CreateLocationInput | UpdateLocationInput>;
  onSubmit: (input: CreateLocationInput | UpdateLocationInput) => void;
  isEdit?: boolean;
}

const locationTypes: LocationType[] = [
  "ADMINISTRATIVE_AREA",
  "ASTRONOMICAL_OBJECT",
  "CITY",
  "CONTINENT",
  "COUNTRY",
  "MARITIME_REGION",
  "REGION",
  "UNKNOWN"
];

const LocationForm: React.FC<Props> = ({ initial = {}, onSubmit, isEdit }) => {
  const [form, setForm] = useState<Partial<CreateLocationInput | UpdateLocationInput>>(initial);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form as any);
      }}
    >
      <div>
        <label>Name</label>
        <input
          required
          value={form.name || ''}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div>
        <label>Type</label>
        <select
          required
          value={form.location_type || ''}
          onChange={e => setForm(f => ({ ...f, location_type: e.target.value as LocationType }))}
        >
          <option value="">Select type</option>
          {locationTypes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Country</label>
        <input
          value={form.country || ''}
          onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
        />
      </div>
      <div>
        <label>City</label>
        <input
          value={form.city || ''}
          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
        />
      </div>
      <div>
        <label>Latitude</label>
        <input
          value={form.latitude || ''}
          onChange={e => setForm(f => ({ ...f, latitude: e.target.value }))}
        />
      </div>
      <div>
        <label>Longitude</label>
        <input
          value={form.longitude || ''}
          onChange={e => setForm(f => ({ ...f, longitude: e.target.value }))}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={form.description || ''}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
      </div>
      <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default LocationForm;
