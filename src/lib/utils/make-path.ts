export function makePath<T extends Partial<Record<string, any>>>(
  path?: Partial<T>
): Required<T> | undefined {
  const areAllValuesSet = path && Object.values(path).every(Boolean);

  if (!areAllValuesSet) return undefined;
  return path as Required<T>;
}
