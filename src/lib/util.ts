// Creates a slug formatted string from supplied string
export const slugify = (str: string): string => {
  return str
    .replace(/(_|-{2,}|\s+)/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/^(-*)/, "")
    .replace(/-{2,}/g, "-")
    .replace(/(-*)$/, "")
    .toLowerCase()
    .trim()
}

export const asString = (val: unknown): string | undefined =>
  typeof val !== "string" ? undefined : val

export const asNumber = (val: unknown): number | undefined => {
  if (typeof val === "number") return
  const valString = asString(val)
  if (!valString) return undefined
  const valParsed = parseInt(valString)
  if (isNaN(valParsed)) return undefined
  return valParsed
}

export const calculateAspectRatio = (
  aspectRatio: string | number | (() => string | number) | undefined,
  defaultAspectRatio: number = 16 / 9
): number => {
  if (aspectRatio === undefined) return defaultAspectRatio

  let _aspectRatio =
    typeof aspectRatio === "function" ? aspectRatio() : aspectRatio

  let __aspectRatio = defaultAspectRatio
  if (typeof _aspectRatio === "string") {
    const [w, h] = _aspectRatio.split(":")
    const width = asNumber(w)
    const height = asNumber(h)
    if (width && height) {
      __aspectRatio = width / height
    }
  }

  return __aspectRatio
}

export const calculateAspectRatioVerticalPadding = (
  aspectRatio: string | number | (() => string | number) | undefined,
  defaultAspectRatio: number = 16 / 9
): string => {
  const _aspectRatio = calculateAspectRatio(aspectRatio, defaultAspectRatio)
  return `${(1 / _aspectRatio) * 100}%`
}

export const toArray = <T = unknown>(val: T | T[]): T[] =>
  Array.isArray(val) ? val : [val]
