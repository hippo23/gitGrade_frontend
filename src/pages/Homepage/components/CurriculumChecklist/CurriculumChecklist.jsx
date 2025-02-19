import { ReactFlow, Background, Controls, MarkerType, ReactFlowProvider, useReactFlow, useNodesState, useEdgesState, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useCallback, useLayoutEffect } from 'react';
import * as Dagre from 'dagre'

const initialNodes = [
  {
    name: 'CS 100',
  },
  {
    name: 'ENG 110',
  },
  {
    name: 'CS 120',
  },
  {
    name: 'COL 101',
  },
  {
    name: 'MAT 150',
  },
  {
    name: 'MAT 140',
  },
  {
    name: 'ECE 110',
  },
  {
    name: 'ECE 210',
  },
  {
    name: 'CS 170',
  },
  {
    name: 'MAT 200',
  },
  {
    name: 'PHY 200 & 200L',
  },
  {
    name: 'ECE 220',
  },
  {
    name: 'ECE 300',
  },
  {
    name: 'CS 225',
  },
  {
    name: 'MAT 225',
  },
  {
    name: 'PHY 250 & 250L',
  },
];

const initialEdges = [
  { source: 'ECE 110', target: 'ECE 220', completed: true },
  { source: 'CS 100', target: 'ECE 110', completed: true },
  { source: 'ENG 110', target: 'ECE 220', completed: true },
  { source: 'CS 120', target: 'CS 170', completed: true },
  { source: 'MAT 150', target: 'MAT 200', completed: true },
  { source: 'MAT 150', target: 'PHY 200 & 200L', completed: true },
  { source: 'CS 100', target: 'ECE 210', completed: true },
  { source: 'CS 170', target: 'CS 225' },
  { source: 'MAT 200', target: 'MAT 225' },
  { source: 'PHY 200 & 200L', target: 'PHY 250 & 250L' },
]


const createNodes = (nodes) => {
  const formattedNodes = nodes.map((node, index) => {
    return {
      id: node.name,
      data: { label: node.name ?? `Node ${index}` },
      position: { x: node.x ?? 0, y: node.y ?? 0 },
      style: {
        background: 'yellow'
      }
    }
  })

  return formattedNodes
}

const createEdges = (edges) => {
  const formattedEdges = edges.map((edge, index) => {
    return {
      id: index,
      source: edge.source,
      target: edge.target,
      style: {
        stroke: edge.completed ? 'green' : 'red',

      },
      animated: true
    }
  })

  return formattedEdges
}

const getLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 172,
      height: node.measured?.height ?? 36,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 500) / 2;
      const y = position.y - (node.measured?.height ?? 500) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const formattedNodes = createNodes(initialNodes)
const formattedEdges = createEdges(initialEdges)
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(formattedNodes, formattedEdges, 'TB')

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);


  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  useLayoutEffect(() => {
    onLayout('LR')
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    ></ReactFlow>
  );
};

const CurriculumChecklist = ({ curriculum, accomplishedSubjects }) => {

  return (
    <div className="h-full w-full bg-white">
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  )
}

export default CurriculumChecklist
