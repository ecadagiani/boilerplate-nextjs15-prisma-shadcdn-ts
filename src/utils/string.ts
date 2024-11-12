
import { remark } from 'remark';
import strip from 'strip-markdown';

export async function stripMarkdown(content: string) {
  const file = await remark().use(strip).process(content);
  return String(file);
}
/**
 * Finds the last index of a regex match in a string
 * @param string The string to search in
 * @param regex The regular expression to search for
 * @param startpos Optional starting position to search from (defaults to end of string)
 * @returns The index of the last match, or -1 if no match found
 */
export function regexLastIndexOf(string: string, regex: RegExp, startpos: number | undefined = undefined) {
  const cleanRegex = (regex.global)
    ? regex
    : new RegExp(regex.source, `g${regex.ignoreCase ? 'i' : ''}${regex.multiline ? 'm' : ''}`);

  let cleanStartPos = startpos;
  if (cleanStartPos === undefined) {
    cleanStartPos = string.length;
  } else if (cleanStartPos < 0) {
    cleanStartPos = 0;
  }
  
  const stringToWorkWith = string.substring(0, cleanStartPos + 1);
  let lastIndexOf = -1;
  let nextStop = 0;
  let result;
  // eslint-disable-next-line no-cond-assign
  while ((result = cleanRegex.exec(stringToWorkWith)) != null) {
    lastIndexOf = result.index;
    cleanRegex.lastIndex = ++nextStop;
  }
  return lastIndexOf;
}


/**
 * Slices a string without breaking words, optionally adding an ellipsis
 * @param str The string to slice
 * @param start The starting index to slice from
 * @param end The ending index to slice to
 * @param ellipsis Optional ellipsis string to append (defaults to '...')
 * @returns The sliced string, trimmed to the last complete word, with optional ellipsis
 */
export function sliceWithoutBreakWord(str: string, start: number, end: number, ellipsis = '...') {
  if (str.length <= end) {
    return str;
  }
  let trimmedString = str.substring(start, end);
  // re-trim if we are in the middle of a word
  trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, regexLastIndexOf(trimmedString, /\s/)));
  return `${trimmedString}${ellipsis}`;
}


export async function excerptFromMarkdown(content: string, length = 100) {
  const stripped = await stripMarkdown(content);
  return sliceWithoutBreakWord(stripped, 0, length);
}
