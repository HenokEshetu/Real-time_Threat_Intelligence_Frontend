import React from 'react';

// Tactics as in screenshot, ordered and with ellipsis for long names
const TACTICS = [
  { id: 'command-and-control', name: 'command-and-contro...' },
  { id: 'resource-development', name: 'resource-developme...' },
  { id: 'privilege-escalation', name: 'privilege-escalati...' },
  { id: 'impact', name: 'impact' },
  { id: 'persistence', name: 'persistence' },
  { id: 'execution', name: 'execution' },
  { id: 'initial-access', name: 'initial-access' },
  { id: 'credential-access', name: 'credential-access' },
  { id: 'lateral-movement', name: 'lateral-movement' },
  { id: 'collection', name: 'collection' },
  { id: 'discovery', name: 'discovery' },
  { id: 'defense-evasion', name: 'defense-evasion' },
  { id: 'exfiltration', name: 'exfiltration' },
  { id: 'reconnaissance', name: 'reconnaissance' },
];

// Add a type for attack-pattern entity
type AttackPattern = {
  id?: string;
  name?: string;
  type?: string;
  kill_chain_phases?: { phase_name: string }[];
  external_references?: { external_id?: string }[];
  // ...other fields as needed
};

// Group attack-patterns by tactic
function groupTechniquesByTactic(report: any) {
  // Find all attack-patterns in report.entities or object_refs
  const entities = report?.entities || {};
  const patterns = Object.values(entities).filter(
    (e: any) => e.type === 'attack-pattern'
  ) as AttackPattern[]; // Type assertion here

  // Group by kill_chain_phases[].phase_name (tactic)
  const tacticMap: Record<string, AttackPattern[]> = {};
  for (const pattern of patterns) {
    if (!pattern.kill_chain_phases) continue;
    for (const phase of pattern.kill_chain_phases) {
      const tactic = phase.phase_name;
      if (!tacticMap[tactic]) tacticMap[tactic] = [];
      tacticMap[tactic].push(pattern);
    }
  }
  return tacticMap;
}

export const TacticsMatrixView = ({ report }: { report: any }) => {
  const tacticMap = React.useMemo(() => groupTechniquesByTactic(report), [report]);

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-2 min-w-[1800px]">
        {TACTICS.map((tac) => {
          const techniques = tacticMap[tac.id] || [];
          return (
            <div
              key={tac.id}
              className="flex-1 min-w-[200px] max-w-[220px] bg-zinc-900/80 border border-zinc-700 rounded-xl shadow px-2 py-2 flex flex-col"
            >
              <div className="font-bold text-white text-sm mb-1 truncate" title={tac.name}>
                {tac.name}
              </div>
              <div className="text-xs text-zinc-400 mb-2">
                {techniques.length} technique{techniques.length !== 1 ? 's' : ''}
              </div>
              <div className="flex flex-col gap-1">
                {techniques.length === 0 && (
                  <div className="text-zinc-600 text-xs italic">—</div>
                )}
                {techniques.map((tech, i) => (
                  <div
                    key={tech.id || i}
                    className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-100 bg-zinc-800/80 hover:bg-blue-900/40 cursor-pointer transition truncate flex items-center"
                    title={tech.name}
                  >
                    <span className="font-medium truncate">{tech.name}</span>
                    {tech.external_references?.[0]?.external_id && (
                      <span className="ml-auto text-blue-300 font-mono bg-zinc-900/80 px-1 rounded">
                        {tech.external_references[0].external_id}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
