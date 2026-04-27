export const LANGUAGES = ['ko', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export function isLanguage(lng: string): lng is Language {
  return (LANGUAGES as readonly string[]).includes(lng);
}
