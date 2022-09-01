import { Arborist } from '@npmcli/arborist';
import { createWriteStream, lstatSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import * as tar from 'tar-stream';
import writeEntries from './writeEntries.js';

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
 * @param {string} path
 * @param {Object} options
 * @param {string=} options.output
 * @param {boolean=} options.filter
 */
export default async function writeFixture(
  path,
  { output = '.', filter = true }
) {
  const arborist = new Arborist({ path });
  const root = await arborist.loadActual();

  output = resolve(output);
  const stat = lstatSync(output, { throwIfNoEntry: false });
  if (stat === undefined || stat.isDirectory()) {
    output = join(output, `${root.packageName}.tgz`);
  }
  mkdirSync(dirname(output), { recursive: true });

  const pack = tar.pack();
  const gzip = createGzip({ level: 9 });

  const outstream = createWriteStream(output);

  await Promise.all([
    writeEntries(pack, root, filter),
    pipeline(pack, gzip, outstream),
  ]);
}
