// react useState
type UseStateSetter<T> = (nextState: T) => void;

export function useState<T>(initialState?: T): [T | null, UseStateSetter<T>] {
  const state = initialState as T;
  const setState: UseStateSetter<T> = (nextState: T) => {};

  return [state, setState];
}
