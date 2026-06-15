import { describe, it, expect, vi, afterEach } from 'vitest';
import { isEnabled, track } from './analytics.js';

afterEach(() => {
  delete window.umami;
  delete window.ym;
});

describe('analytics (observability layer)', () => {
  it('isEnabled is true only for production builds', () => {
    expect(isEnabled({ PROD: true })).toBe(true);
    expect(isEnabled({ PROD: false })).toBe(false);
    expect(isEnabled({})).toBe(false);
  });

  it('track is a no-op (never throws) when no counter is present', () => {
    delete window.umami;
    delete window.ym;
    expect(() => track('install', { manager: 'npm' })).not.toThrow();
  });

  it('track forwards the event + props to Umami', () => {
    const spy = vi.fn();
    window.umami = { track: spy };
    track('github-click', { location: 'nav' });
    expect(spy).toHaveBeenCalledWith('github-click', { location: 'nav' });
  });

  it('track forwards the event to Yandex.Metrika as a reachGoal', () => {
    const spy = vi.fn();
    window.ym = spy;
    track('copy', { title: 'npm' });
    expect(spy).toHaveBeenCalledWith(109875855, 'reachGoal', 'copy', { title: 'npm' });
  });

  it('track swallows errors thrown by a counter', () => {
    window.umami = { track: () => { throw new Error('boom'); } };
    window.ym = () => { throw new Error('boom'); };
    expect(() => track('x')).not.toThrow();
  });
});
