import { describe, it, expect } from 'vitest';
import { calcNextDepth } from '../services/question-engine';

describe('calcNextDepth', () => {
  it('응답률 낮으면 깊이 낮춤', () => {
    expect(calcNextDepth(3, 8, 2)).toBe(2);
  });

  it('응답률 높고 답변 충분하면 깊이 올림', () => {
    expect(calcNextDepth(2, 1, 10)).toBe(3);
  });

  it('깊이 1 이하로 내려가지 않음', () => {
    expect(calcNextDepth(1, 10, 0)).toBe(1);
  });

  it('깊이 5 이상으로 올라가지 않음', () => {
    expect(calcNextDepth(5, 0, 20)).toBe(5);
  });

  it('응답률 보통이면 유지', () => {
    expect(calcNextDepth(3, 3, 7)).toBe(3);
  });
});
