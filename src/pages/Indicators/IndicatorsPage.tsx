import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIndicators } from '../../hooks/useIndicators';
import { SearchBar } from '../../components/filters/SearchBar/SearchBar';
import { EntityCard } from '@/components/common/EntityCard/EntityCard';
import { ContentViewer } from '../../components/common/ContentViewer/ContentViewer';
import { Indicator } from '../../types/indicator';

export const IndicatorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { indicators, loading, error, loadMore, hasMore } = useIndicators({
    // filters: searchTerm ? { name: searchTerm } : {},
    filters: {
      // labels: [
      // 'malware',
      // 'phishing',
      // 'hash',
      // 'suspicious',
      // 'trusted',
      // 'internal-network',
      // ],
      // confidence: 90,
    },
    page: 1,
    pageSize: 10,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleViewIndicator = (id: string) => {
    navigate(`/indicators/${id}`);
  };

  if (loading && indicators.length === 0)
    return <div>Loading indicators...</div>;
  if (error) return <div>Error loading indicators: {error.message}</div>;

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header d-flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Indicators</h1>
        <Link to="/indicators/create" className="btn btn-primary">
          + New Indicator
        </Link>
      </div>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Indicator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {indicators.map((indicator: Indicator) => (
          <EntityCard
            key={indicator.id}
            id={indicator.id}
            title={indicator.name || 'Untitled Indicator'}
            subtitle={indicator.pattern_type}
            description={`Type: ${
              indicator.indicator_types?.join(', ') || 'N/A'
            }`}
            entityType="indicator"
            created={indicator.created}
            labels={indicator.labels || []}
            actions={[
              {
                label: 'View Details',
                onClick: () => handleViewIndicator(indicator.id),
              },
            ]}
            metadata={{
              'Valid From': new Date(indicator.valid_from).toLocaleString(),
              'Valid Until': indicator.valid_until
                ? new Date(indicator.valid_until).toLocaleString()
                : '—',
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {hasMore && (
        <div className="text-center mt-6">
          <button onClick={loadMore} className="btn btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
