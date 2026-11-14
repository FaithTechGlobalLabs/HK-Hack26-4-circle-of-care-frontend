// Design tokens for the "street sign" light look (mirrors care/static/care/app.css).

export const theme = {
  colors: {
    bg: "#F5F7F9",
    surface: "#FFFFFF",
    ink: "#1B2430",
    muted: "#5B6573",
    line: "#E1E6EB",
    rule: "#C3CBD4",
    soft: "#EEF2F5",
    primary: "#0E7A63",
    primaryInk: "#FFFFFF",
    primarySoft: "#DDF1EB",
    danger: "#B5162F",
    dangerSoft: "#FBE1E4",
  },
  categories: {
    housing: { color: "#1F5FBF", tint: "#E3EEFB" },
    food: { color: "#A55A00", tint: "#FDEBD3" },
    medical: { color: "#B5162F", tint: "#FBE1E4" },
    social: { color: "#0B7A57", tint: "#DDF2EA" },
    prayer: { color: "#6B3FA0", tint: "#ECE5F7" },
    other: { color: "#4B5768", tint: "#E9EDF2" },
  } as Record<string, { color: string; tint: string }>,
  fonts: {
    body: 'var(--font-barlow), "Noto Sans HK", system-ui, -apple-system, sans-serif',
    cond: 'var(--font-barlow-condensed), "Noto Sans HK", system-ui, sans-serif',
  },
  maxWidth: "720px",
} as const;

export type Theme = typeof theme;

export function categoryColors(t: Theme, category: string) {
  return t.categories[category] ?? { color: t.colors.muted, tint: t.colors.soft };
}
