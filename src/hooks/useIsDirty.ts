import { useMemo } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

/**
 * Custom hook to properly detect form dirty state when using react-hook-form with dependent fields.
 *
 * This hook fixes an issue where useForm's isDirty flag can be true even when no fields are actually dirty,
 * which happens when updating field values based on changes to other fields.
 *
 * @param form - The form instance from useForm()
 *
 * @see {@link https://github.com/react-hook-form/react-hook-form/issues/4740}
 *
 * @example
 * ```tsx
 * const form = useForm();
 * const isDirty = useIsDirty(form);
 *
 * // When field2 updates based on field1:
 * useEffect(() => {
 *   form.setValue('field2', field1Value);
 * }, [field1Value]);
 * ```
 */

export function useIsDirty<T extends FieldValues>(form: UseFormReturn<T>) {
  // This workaround, because useForm display isDirty even when dirtyField is empty, when you update a field based on another field.
  // https://github.com/react-hook-form/react-hook-form/issues/4740
  // This hook is the easiest and cleaner solution found
  const watch = form.watch();
  return useMemo(() => {
    if (form.formState.isDirty === false) return false;
    return Object.keys(form.formState.dirtyFields).length > 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.dirtyFields, watch]);
}
