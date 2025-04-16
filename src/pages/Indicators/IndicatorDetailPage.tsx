import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIndicator } from '../../hooks/useIndicators';
import { EntityDetail } from '../../components/common/EntityDetail/EntityDetail';
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';

export const IndicatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { indicator, loading, error } = useIndicator(id || '');

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!indicator) return <ErrorMessage message="Indicator not found" />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/indicators"
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          ← Back to List
        </Link>
        <Link
          to={`/indicators/${id}/edit`}
          className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Edit
        </Link>
      </div>

      <EntityDetail
        id={indicator.id}
        name={indicator.name}
        description={indicator.description}
        created={indicator.created}
        modified={indicator.modified}
        type={indicator.type}
        icon="shield"
        hashes={indicator.hashes}
        metadata={{
          'Pattern Type': indicator.pattern_type,
          'Valid From': indicator.valid_from,
          'Valid Until': indicator.valid_until || 'N/A',
          Confidence:
            indicator.confidence !== undefined
              ? `${indicator.confidence}%`
              : 'N/A',
          'Created By': indicator.created_by_ref || 'Unknown',
          'Indicator Types': indicator.indicator_types?.join(', ') || 'N/A',
          Revoked: indicator.revoked ? 'Yes' : 'No',
        }}
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Pattern</h2>
          <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-x-auto">
            {indicator.pattern}
          </pre>
        </div>

        {indicator.kill_chain_phases?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Kill Chain Phases</h2>
            <ul className="space-y-2">
              {indicator.kill_chain_phases.map(
                ({
                  phase,
                  index,
                }: {
                  phase: { kill_chain_name: string; phase_name: string };
                  index: number;
                }) => (
                  <li
                    key={index}
                    className="bg-white border rounded-md p-3 shadow-sm"
                  >
                    <strong>{phase.kill_chain_name}:</strong> {phase.phase_name}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
      </EntityDetail>
    </div>
  );
};
