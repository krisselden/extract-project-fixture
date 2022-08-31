import { dirname, join, relative } from 'node:path';
import walkTree from './walkTree.js';
import filterKeys from './filterKeys.js';

const keep = new Set([
  'name',
  'version',
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'bundledDependencies',
  'optionalDependencies',
  'overrides',
  'resolutions',
  'workspaces',
]);

/**
 * Write directories, links and packages to the tar stream
 * for the specified tree.
 * @param {import('tar-stream').Pack} pack
 * @param {import('../types').TreeNode} root
 * @param {boolean=} filterPackage
 */
export default async function writeEntries(pack, root, filterPackage = false) {
  for (const node of walkTree(root)) {
    if (node.isLink) {
      await entry(pack, {
        type: 'symlink',
        name: relative(root.path, node.path),
        linkname: relative(dirname(node.path), node.target.path),
      });
    } else {
      const pkg = filterPackage ? filterKeys(node.package, keep) : node.package;
      await entry(
        pack,
        {
          type: 'file',
          name: join(relative(root.path, node.path), 'package.json'),
        },
        JSON.stringify(pkg)
      );
    }
  }
  pack.finalize();
}

/**
 * @param {import('tar-stream').Pack} pack
 * @param {import('tar-stream').Headers} headers
 * @param {Buffer | string =} buffer
 * @returns {Promise<void>}
 */
function entry(pack, headers, buffer) {
  return new Promise((resolve, reject) => {
    pack.entry(headers, buffer, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
