// Solution from https://stackoverflow.com/questions/17380845/how-do-i-convert-a-string-to-enum-in-typescript
export function enumFromStringValue<T> (
  enm: { [s: string]: T},
  value: string
): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
}
