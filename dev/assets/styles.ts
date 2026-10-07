import {
  defineCompoundClasses,
  getCss,
  type AppAtomicClassNames,
  type AppClassNames,
  type AtomicClassOverrides,
  type AtomicClassName,
  type ClassNamesPhrase,
  type MediaConstraintsOverrides,
} from "@cyftec/maya/nocss";

/**
 * This file is an example app stylesheet source. Brahma reads its exported
 * atomic maps at build time and writes a sibling styles.css file. The compound
 * map is also passed to css so role names expand to atoms in the browser.
 */
export const mediaConstraintsOverrides = {
  ns: { minWidth: "30em" },
  m: { minWidth: "30em", maxWidth: "60em" },
  l: { minWidth: "60em" },
} as const satisfies MediaConstraintsOverrides;

export const atomicClassOverrides = {
  default: {
    w6: "{ width: 32rem }",
  },
} as const satisfies AtomicClassOverrides;

type AppAtomicClassName = AppAtomicClassNames<
  AtomicClassName,
  typeof atomicClassOverrides
>;

export const compoundClasses = defineCompoundClasses<AppAtomicClassName>()({
  used: "ma0 pa3 w5 dark-gray gray f5 f6",
});

export type { ClassNamesPhrase };
export type ClassName = AppClassNames<
  AtomicClassName,
  typeof atomicClassOverrides,
  typeof compoundClasses
>;
export const css = getCss<ClassName, typeof compoundClasses>(compoundClasses);
