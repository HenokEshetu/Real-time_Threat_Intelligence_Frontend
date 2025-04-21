import React from 'react';
import { Card, CardContent } from '../ui/card';
import ReactMarkdown from 'react-markdown';
import { Indicator } from '@/types/indicator';
import rehypeHighlight from 'rehype-highlight';

export const IndicatorOverview = ({ indicator }: { indicator: Indicator }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h1 className="uppercase text-xs text-forground font-bold">
            Details
          </h1>
          <Card className="bg-transparent border border-gray-300 rounded-sm shadow-none">
            <CardContent className="space-y-4 p-6">
              <div>
                <h2 className="font-semibold text-base mb-2">
                  Indicator Pattern
                </h2>
                <pre className="bg-gray-300 p-3 rounded overflow-x-auto text-sm">
                  {indicator.pattern}
                </pre>
              </div>
              {indicator.description && (
                <div>
                  <h2 className="font-semibold text-base mb-2">Description</h2>
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    // className="prose prose-invert"
                  >
                    {indicator.description}
                  </ReactMarkdown>
                </div>
              )}

              {indicator.kill_chain_phases?.length > 0 && (
                <div>
                  <h2 className="font-semibold mb-1">Kill Chain Phases</h2>
                  <div className="grid gap-2">
                    {indicator.kill_chain_phases.map((phase, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded p-3 text-sm"
                      >
                        <strong>{phase.kill_chain_name}</strong>:{' '}
                        {phase.phase_name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <h1 className="uppercase text-xs text-forground font-bold">
            Basic Information
          </h1>
          <Card className="bg-transparent shadow-none border border-gray-300 rounded-sm">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold">Metadata</h2>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Created:</strong>{' '}
                  {new Date(indicator.created).toLocaleString()}
                </div>
                <div>
                  <strong>Modified:</strong>{' '}
                  {new Date(indicator.modified).toLocaleString()}
                </div>
                <div>
                  <strong>Pattern Type:</strong> {indicator.pattern_type}
                </div>
                <div>
                  <strong>Valid From:</strong>{' '}
                  {new Date(indicator.valid_from).toLocaleString()}
                </div>
                <div>
                  <strong>Valid Until:</strong>{' '}
                  {indicator.valid_until
                    ? new Date(indicator.valid_until).toLocaleString()
                    : 'N/A'}
                </div>
                <div>
                  <strong>Confidence:</strong>{' '}
                  {indicator.confidence !== undefined
                    ? `${indicator.confidence}%`
                    : 'N/A'}
                </div>
                <div>
                  <strong>Created By:</strong>{' '}
                  {indicator.created_by_ref || 'Unknown'}
                </div>
                <div>
                  <strong>Indicator Types:</strong>{' '}
                  {indicator.indicator_types?.join(', ') || 'N/A'}
                </div>
                <div>
                  <strong>Revoked:</strong> {indicator.revoked ? 'Yes' : 'No'}
                </div>
                {indicator.hashes && (
                  <div>
                    <strong>Hashes:</strong>
                    <ul className="pl-4 list-disc">
                      {Object.entries(indicator.hashes).map(([algo, hash]) => (
                        <li key={algo}>
                          <strong>{algo}:</strong> {hash}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
