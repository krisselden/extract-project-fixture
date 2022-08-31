export interface TreeNode {
  package: Record<string, any>;
  isLink: boolean;
  target: TreeNode;
  children: Map<string, TreeNode>;
  path: string;
}

export interface EntryBase<T extends EntryType> {
  type: T;
  name: string;
  linkname?: string;
}

export interface FileEntry extends EntryBase<'file'> {
  linkname: undefined;
}

export interface SymlinkEntry extends EntryBase<'symlink'> {
  linkname: string;
}

export interface EntryMap {
  file: FileEntry;
  symlink: SymlinkEntry;
}

export type EntryType = keyof EntryMap;
export type Entry = EntryMap[EntryType];
