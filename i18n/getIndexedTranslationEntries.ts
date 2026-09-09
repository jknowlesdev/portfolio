/**
 * Discover numerically-indexed entries in a flat translation section and
 * group them by index. Filters keys matching `${prefix}\d+${anchorSuffix}$`
 * (one per item), then reconstructs sibling keys for each item by swapping
 * the anchor suffix for each requested sibling suffix.
 *
 * @example
 * ```ts
 * // Showcase cards — call
 * getIndexedTranslationEntries(showcase, 'card', 'Label', ['Icon', 'Description']);
 * // example result
 * [
 *   { anchor: '8+ years', siblings: { Icon: 'clock', Description: 'front-end architecture at scale' } },
 *   // ...one entry per cardNLabel found in the section
 * ]
 * ```
 *
 * @example
 * ```ts
 * // Classifieds — call
 * getIndexedTranslationEntries(classifieds, 'ad', 'Header', ['Body']);
 * // example result
 * [
 *   { anchor: 'POSITION', siblings: { Body: 'Deep front-end architecture...' } },
 *   // ...one entry per adNHeader found in the section
 * ]
 * ```
 */

export function getIndexedTranslationEntries<
  AnchorTranslationKeySuffix extends string,
  SiblingTranslationKeySuffix extends string,
>(
  section: Record<string, string>,
  prefix: string,
  anchorSuffix: AnchorTranslationKeySuffix,
  siblingSuffixes: readonly SiblingTranslationKeySuffix[]
): Array<{ anchor: string; siblings: Record<SiblingTranslationKeySuffix, string> }> {
  // Strict pattern: only ${prefix}<digits>${anchorSuffix} keys qualify. Prevents
  // accidental matches against non-indexed keys that happen to end in the same suffix.
  const anchorPattern = new RegExp(`^${prefix}\\d+${anchorSuffix}$`);
  return Object.keys(section)
    // Keep only the anchor keys — one per indexed item (e.g. cardNLabel).
    .filter((key) => anchorPattern.test(key))
    // Sort alphabetically; i.e. although string indices 1-9 would order correctly, 10+ would need natural sort.
    .sort()
    .map((anchorKey) => {
      // Anchor value (e.g. section['card1Label'] → '8+ years').
      const anchor = section[anchorKey];
      // Build the siblings record: for each sibling suffix, derive its full
      // key by swapping the anchor suffix (e.g. 'card1Label' → 'card1Icon')
      // and read the value from the section.
      const siblings = Object.fromEntries(
        siblingSuffixes.map((suffix) => [
          suffix,
          section[anchorKey.replace(anchorSuffix, suffix)],
        ])
      ) as Record<SiblingTranslationKeySuffix, string>;
      return { anchor, siblings };
    });
}
