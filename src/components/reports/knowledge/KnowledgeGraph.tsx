import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

function buildGraphData(report: any) {
  const nodes: any[] = [];
  const links: any[] = [];
  const nodeMap: Record<string, any> = {};

  nodes.push({
    id: report.id,
    name: report.name,
    type: 'report',
    main: true,
  });
  nodeMap[report.id] = true;

  (report.relationship || []).forEach((rel: any) => {
    const source = rel.source_ref;
    const target = rel.target_ref;
    if (!nodeMap[source]) {
      nodes.push({ id: source, type: 'entity' });
      nodeMap[source] = true;
    }
    if (!nodeMap[target]) {
      nodes.push({ id: target, type: 'entity' });
      nodeMap[target] = true;
    }
    let label = rel.relationship_type;
    const sourceNode = typeof report.entities === 'object' ? report.entities[source] : null;
    const targetNode = typeof report.entities === 'object' ? report.entities[target] : null;
    let relObj = null;
    if (sourceNode && Array.isArray(sourceNode.relationship)) {
      relObj = sourceNode.relationship.find(
        (r: any) => r.source_ref === source && r.target_ref === target
      );
    }
    if (!relObj && targetNode && Array.isArray(targetNode.relationship)) {
      relObj = targetNode.relationship.find(
        (r: any) => r.source_ref === source && r.target_ref === target
      );
    }
    if (relObj && relObj.relationship_type) {
      label = relObj.relationship_type;
    }
    links.push({
      source,
      target,
      label,
    });
  });

  return { nodes, links };
}

export const ReportKnowledgeGraph = ({ report }: { report: any }) => {
  if (!report) return null;

  const graphData = React.useMemo(() => buildGraphData(report), [report]);
  const [selectedNode, setSelectedNode] = React.useState<any | null>(null);
  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([]);
  const fgRef = React.useRef<any>(null);

  // Helper to get more info about a node (stub, expand as needed)
  const getNodeDetail = (node: any): any => {
    if (!node) return null;
    if (node.id === report.id) {
      return {
        title: report.name,
        type: 'Report',
        ...report,
      };
    }
    const rel = (report.relationship || []).find(
      (r: any) => r.source_ref === node.id || r.target_ref === node.id
    );
    return {
      title: node.name || node.id,
      type: node.type,
      ...rel,
    };
  };

  // Zoom handlers
  const handleZoomIn = () => {
    if (fgRef.current) {
      const curr = fgRef.current.zoom();
      fgRef.current.zoom(curr * 1.2, 400);
    }
  };
  const handleZoomOut = () => {
    if (fgRef.current) {
      const curr = fgRef.current.zoom();
      fgRef.current.zoom(curr / 1.2, 400);
    }
  };
  const handleZoomReset = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400);
    }
  };

  // Node click handler (multi-select support)
  const handleNodeClick = (node: any, event: MouseEvent) => {
    if (event.ctrlKey || event.shiftKey) {
      setSelectedNodes((prev) =>
        prev.some((n) => n.id === node.id)
          ? prev.filter((n) => n.id !== node.id)
          : [...prev, node]
      );
    } else {
      setSelectedNodes([node]);
    }
    setSelectedNode(node);
  };

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-bold mb-2">Knowledge Graph</h2>
      {/* Zoom controls */}
      <div className="absolute z-10 flex gap-2 right-8 top-8">
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
          onClick={handleZoomIn}
          title="Zoom In"
        >+</button>
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
          onClick={handleZoomOut}
          title="Zoom Out"
        >−</button>
        <button
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
          onClick={handleZoomReset}
          title="Reset Zoom"
        >⤾</button>
      </div>
      <div style={{ height: 500, background: '#fff', borderRadius: 8 }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={(node: any) => node.name || node.id}
          nodeAutoColorBy="type"
          linkLabel={(link: any) => link.label}
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={1}
          onNodeClick={handleNodeClick}
          onBackgroundClick={() => {
            setSelectedNode(null);
            setSelectedNodes([]);
          }}
          // linkCanvasLabel and linkCanvasLabelStyle are not supported by react-force-graph-2d
        />
      </div>
      {/* Node detail panel */}
      {selectedNode && (
        <div
          className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg border-l border-gray-200 z-50 p-6 overflow-y-auto"
          style={{ maxWidth: '100vw' }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setSelectedNode(null)}
            aria-label="Close"
          >
            ×
          </button>
          {(() => {
            const detail = getNodeDetail(selectedNode);
            if (!detail) return <div>No details available.</div>;
            return (
              <div>
                <div className="text-xs text-gray-400 mb-1 uppercase">{detail.type}</div>
                <div className="text-lg font-bold mb-2">{detail.title}</div>
                <div className="text-sm text-gray-700 break-all mb-2">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(detail, null, 2)}</pre>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
