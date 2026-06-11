export const colors = {
  primary: '#4A7C59',
  primaryLight: '#6B9E78',
  primaryDark: '#2F5C3E',
  secondary: '#E8D5B7',
  background: '#FAFAF7',
  surface: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#9B9B9B',
  border: '#E5E5E5',
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 36,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const CHAPTERS = [
  '유년기',
  '부모의 부모',
  '연애·결혼',
  '자식을 키우며',
  '일과 삶',
  '지금의 나',
  '너에게',
] as const;

export type Chapter = (typeof CHAPTERS)[number];
