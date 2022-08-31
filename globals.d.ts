declare module '@npmcli/arborist' {
  class ArboristNode {
    pkgid: string;
    packageName: string;
    name: string;
    version: string;
    path: string;
    package: Record<string, any>;
    root: ArboristNode;
    tops: Set<ArboristNode>;
    edgesOut: Map<string, ArboristEdge>;
    children: Map<string, ArboristNode>;
    dev: boolean;
    peer: boolean;
    optional: boolean;
    isWorkspace: boolean;
    isLink: boolean;
    target: ArboristNode;
  }

  export type ArboristEdgeType =
    | 'prod'
    | 'dev'
    | 'optional'
    | 'peer'
    | 'peerOptional'
    | 'workspace';

  class ArboristEdge {
    name: string;
    spec: string;
    type: ArboristEdgeType;
    from: ArboristNode;
    to: ArboristNode;
  }

  class Arborist {
    constructor(options?: { path?: string });
    loadActual(): Promise<ArboristNode>;
  }

  export {
    Arborist,
    ArboristNode as Node,
    ArboristNode as Link,
    ArboristEdge as Edge,
  };
}
