export const extractPairs = response =>
    Object.values(response.result)
      .map((pair: any): string => pair.wsname)
      .filter((pair: string): boolean => !!pair)