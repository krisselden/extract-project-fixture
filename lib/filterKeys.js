/**
 * @param {Record<string, unknown>} pkg
 * @param {Set<string>} keep
 */
export default function filterKeys(pkg, keep) {
  return Object.fromEntries(
    Object.entries(pkg).filter(([key]) => keep.has(key))
  );
}
