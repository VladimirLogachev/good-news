export type Dictionary<A> = { [key: string]: A };

export const omit = key => <A>({ [key]: _, ...rest }: Dictionary<A>): Dictionary<A> => rest;

export const keys = (o: Object): string[] => Object.keys(o);

export const values = <A>(o: Dictionary<A>): A[] => Object.values(o);

export const toDictionaryByProp = (keyName: string) => (arr: Dictionary<any>[]) =>
  arr.reduce((acc, v) => ({ ...acc, [v[keyName]]: v }), {});
