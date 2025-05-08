import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockRegions = [
  { name: 'Africa', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Americas', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Asia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Australia and New Zealand', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Central Asia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Eastern Asia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Eastern Europe', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Europe', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Latin America and the Caribbean', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Melanesia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Micronesia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Middle East', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Northern Africa', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Northern America', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Northern Europe', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Oceania', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Polynesia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'South-eastern Asia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  { name: 'Southern Asia', created: 'Aug 22, 2023', modified: 'Oct 18, 2023' },
  // ...add more as needed
];

export default function Regions() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#181a20', minHeight: '100vh', color: '#eaeaea', padding: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Locations / Regions</h1>
        <div style={{ background: '#23262f', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #0002' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead style={{ background: '#23262f', color: '#b5b5b5', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>NAME</th>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>ORIGINAL CREATION DATE</th>
                <th style={{ padding: '16px 20px', fontWeight: 600 }}>MODIFICATION DATE</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {mockRegions.map((region, idx) => (
                <tr
                  key={region.name}
                  style={{
                    background: idx % 2 === 0 ? '#23262f' : '#20222a',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => navigate(`/location/regions/${encodeURIComponent(region.name)}`)}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') navigate(`/location/regions/${encodeURIComponent(region.name)}`);
                  }}
                  aria-label={`View details for ${region.name}`}
                >
                  <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#2e3140',
                      marginRight: 10,
                    }}>
                      <svg width="18" height="18" fill="#4cc9f0" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#23262f"/><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.38 0 2.63.35 3.73.97C15.1 6.1 13.7 7 12 7s-3.1-.9-3.73-2.03A7.97 7.97 0 0 1 12 4zm-8 8c0-1.1.22-2.16.62-3.12C6.1 10.1 8.9 11 12 11s5.9-.9 7.38-2.12c.4.96.62 2.02.62 3.12 0 1.1-.22 2.16-.62 3.12C17.9 13.9 15.1 13 12 13s-5.9.9-7.38 2.12A7.97 7.97 0 0 1 4 12zm8 8a7.97 7.97 0 0 1-3.73-.97C8.9 17.9 10.3 17 12 17s3.1.9 3.73 2.03A7.97 7.97 0 0 1 12 20zm7.38-2.12C17.9 13.9 15.1 13 12 13s-5.9.9-7.38 2.12A7.97 7.97 0 0 1 12 20a7.97 7.97 0 0 1 7.38-2.12z" fill="#4cc9f0"/></svg>
                    </span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{region.name}</span>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#b5b5b5' }}>{region.created}</td>
                  <td style={{ padding: '14px 20px', color: '#b5b5b5' }}>{region.modified}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <svg width="18" height="18" fill="#b5b5b5" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#b5b5b5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 16, color: '#b5b5b5', fontSize: 13 }}>
          {mockRegions.length} entit{mockRegions.length === 1 ? 'y' : 'ies'}
        </div>
      </div>
    </div>
  );
}
