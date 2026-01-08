import debounce from "lodash/debounce";
import { useMemo } from "react";

import type { DebouncedFunc } from "lodash";

export const useDebounce = <A extends unknown[], R>(
  callback: (...args: A) => R,
  delay: number,
): DebouncedFunc<(...args: A) => R> => {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
};
