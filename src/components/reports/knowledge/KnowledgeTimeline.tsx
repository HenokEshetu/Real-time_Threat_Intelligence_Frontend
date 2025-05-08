import React from 'react';
import {
  Bug,
  Crosshair,
  Shield,
  User,
  Globe,
  FileText,
  Link2,
  AlertTriangle,
  Star,
  Swords,
  ShieldAlert,
  Sparkle,
  Terminal,
  Database,
  Activity,
  Clock,
} from 'lucide-react';

// Helper: icon and color by type
const typeIcon = (type: string) => {
  switch (type) {
    case 'attack-pattern':
      return { icon: <Crosshair className="text-yellow-400" />, color: 'border-yellow-400' };
    case 'malware':
      return { icon: <Bug className="text-orange-500" />, color: 'border-orange-500' };
    case 'tool':
      return { icon: <Terminal className="text-cyan-400" />, color: 'border-cyan-400' };
    case 'threat-actor':
      return { icon: <Swords className="text-cyan-500" />, color: 'border-cyan-500' };
    case 'intrusion-set':
      return { icon: <Star className="text-red-500" />, color: 'border-red-500' };
    case 'campaign':
      return { icon: <Sparkle className="text-pink-400" />, color: 'border-pink-400' };
    case 'indicator':
      return { icon: <ShieldAlert className="text-purple-500" />, color: 'border-purple-500' };
    case 'infrastructure':
      return { icon: <Database className="text-blue-500" />, color: 'border-blue-500' };
    case 'vulnerability':
      return { icon: <AlertTriangle className="text-amber-500" />, color: 'border-amber-500' };
    case 'identity':
      return { icon: <User className="text-green-500" />, color: 'border-green-500' };
    case 'location':
      return { icon: <Globe className="text-blue-400" />, color: 'border-blue-400' };
    case 'report':
      return { icon: <FileText className="text-blue-500" />, color: 'border-blue-500' };
    default:
      return { icon: <Link2 className="text-gray-400" />, color: 'border-gray-400' };
  }
};

// Helper: get date for sorting
const getTimelineDate = (rel: any, obj: any) =>
  rel?.start_time || rel?.created || obj?.created || obj?.first_seen || obj?.published || '';

/**
 * Build timeline items from report data.
 * @param report The report object (with relationship and object_refs fields)
 * @returns Array of timeline items sorted by date desc
 */
function buildTimelineItems(report: any) {
  if (!report || !report.relationship || !report.object_refs) return [];

  // Build a map of all objects by id for fast lookup
  const entities: Record<string, any> = {};
  if (report.entities) {
    Object.entries(report.entities).forEach(([id, obj]) => {
      entities[id] = obj;
    });
  }

  // For each relationship, get the related object (target or source)
  const items: any[] = [];
  for (const rel of report.relationship) {
    // Try to get the object (target_ref preferred)
    const obj = entities[rel.target_ref] || entities[rel.source_ref];
    if (!obj) continue;
    const date = getTimelineDate(rel, obj);
    items.push({
      id: rel.id || rel.target_ref || rel.source_ref,
      type: obj.type,
      name: obj.name || obj.value || obj.id,
      description: obj.description,
      date,
      relType: rel.relationship_type,
      relDescription: rel.description,
      relId: rel.id,
      rel,
      obj,
    });
  }

  // Sort by date descending (most recent first)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return items;
}

export const KnowledgeTimeline = ({ report }: { report: any }) => {
  const items = React.useMemo(() => buildTimelineItems(report), [report]);

  if (!items.length)
    return <div className="p-8 text-zinc-400">No timeline data available.</div>;

  return (
    <div className="relative px-8 py-6 min-h-[400px]">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-900/20 to-blue-200/10 rounded-full -translate-x-1/2" />
      <ol className="relative z-10 flex flex-col gap-12">
        {items.map((item, idx) => {
          const alignRight = idx % 2 === 0;
          const { icon, color } = typeIcon(item.type);
          return (
            <li
              key={item.id + idx}
              className={`flex w-full items-center gap-6 ${alignRight ? 'flex-row-reverse' : ''}`}
            >
              {/* Content Card */}
              <div
                className={`w-[48%] max-w-xl bg-zinc-900/80 border border-zinc-700 rounded-xl shadow-lg px-6 py-5 relative`}
                style={{
                  marginLeft: alignRight ? 'auto' : 0,
                  marginRight: alignRight ? 0 : 'auto',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-base text-white truncate">
                    {item.type === 'attack-pattern' && item.obj.external_references?.[0]?.external_id
                      ? `[${item.obj.external_references[0].external_id}] `
                      : ''}
                    {item.name}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.date ? new Date(item.date).toLocaleString() : '—'}
                  </span>
                </div>
                <div className="text-sm text-zinc-300 line-clamp-3">
                  {item.description || item.relDescription || 'No description.'}
                </div>
              </div>
              {/* Timeline Dot/Icon */}
              <div className="flex flex-col items-center gap-0 z-20">
                <span
                  className={`w-10 h-10 rounded-full bg-zinc-900 border-4 ${color} flex items-center justify-center shadow-lg`}
                >
                  {icon}
                </span>
                {idx < items.length - 1 && (
                  <span className="w-1 flex-1 bg-blue-900/20 mx-auto" style={{ minHeight: 40 }} />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
