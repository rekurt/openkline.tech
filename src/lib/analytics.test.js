import { describe, it, expect, vi, afterEach } from 'vitest';
import { isEnabled, umamiConfigured, track } from './analytics.js';

afterEach(() => {
  delete window.umami;
});

describe('analytics core', () => {
  it('isEnabled is true only for production builds', () => {
    expect(isEnabled({ PROD: true })).toBe(true);
    expect(isEnabled({ PROD: false })).toBe(false);
    expect(isEnabled({})).toBe(false);
  });

  it('umamiConfigured requires both id and src', () => {
    expect(umamiConfigured({ umamiId: 'x', umamiSrc: 'y' })).toBe(true);
    expect(umamiConfigured({ umamiId: '', umamiSrc: 'y' })).toBe(false);
    expect(umamiConfigured({ umamiId: 'x', umamiSrc: '' })).toBe(false);
  });

  it('track is a no-op (never throws) when umami is absent', () => {
    delete window.umami;
    expect(() => track('install', { manager: 'npm' })).not.toThrow();
  });

  it('track forwards event + props to window.umami.track', () => {
    const spy = vi.fn();
    window.umami = { track: spy };
    track('github-click', { location: 'nav' });
    expect(spy).toHaveBeenCalledWith('github-click', { location: 'nav' });
  });

  it('track swallows errors thrown by umami', () => {
    window.umami = { track: () => { throw new Error('boom'); } };
    expect(() => track('x')).not.toThrow();
  });
});
