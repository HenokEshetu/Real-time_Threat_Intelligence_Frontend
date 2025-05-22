import React from 'react';
import { useParams } from 'react-router-dom';
import RegionOverview from './RegionOverview';

export default function RegionDetailPage() {
  const { regionName } = useParams<{ regionName: string }>();
  return <RegionOverview regionName={regionName} />;
}
