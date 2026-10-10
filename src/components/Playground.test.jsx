import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Playground } from './Playground.jsx';

vi.mock('./OkChart.jsx', () => ({
  OkChart: ({ symbol, resolution, chartType, indicators }) =>
    <output>{JSON.stringify({ symbol, resolution, chartType, indicators })}</output>,
}));
vi.mock('./CodeBlock.jsx', () => ({ CodeBlock: ({ children }) => <pre>{children}</pre> }));

let container;
let root;
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.useFakeTimers();
  window.history.replaceState({}, '', '/');
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const mount = () => act(() => root.render(<Playground />));
const chart = () => JSON.parse(container.querySelector('output').textContent);
const snippet = () => container.querySelector('pre').textContent;
const button = text => [...container.querySelectorAll('button')].find(b => b.textContent === text);
function select(index, value) {
  act(() => {
    const field = container.querySelectorAll('select')[index];
    field.value = value;
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

describe('automatic playground updates', () => {
  it('updates chart and code immediately for each selector', () => {
    mount();
    select(0, 'ETH/USDT');
    expect(chart().symbol).toBe('ETH/USDT');
    expect(snippet()).toContain("symbol: 'ETH/USDT'");
    select(1, '4H');
    expect(chart().resolution).toBe('4H');
    expect(snippet()).toContain("resolution: '4H'");
    select(2, 'line');
    expect(chart().chartType).toBe('line');
    expect(snippet()).toContain("chartType: 'line'");
    expect(container.textContent).not.toMatch(/press Update|Up to date|Update ▸/);
  });
  it('applies indicator toggles and reset immediately', () => {
    mount();
    act(() => button('Bollinger').click());
    expect(chart().indicators.map(i => i.type)).toEqual(['sma', 'ema', 'bb']);
    expect(snippet()).toContain("type: 'bb'");
    act(() => button('SMA 20').click());
    expect(chart().indicators.map(i => i.type)).toEqual(['ema', 'bb']);
    act(() => button('Reset').click());
    expect(chart().indicators.map(i => i.type)).toEqual(['sma', 'ema']);
    expect(snippet()).not.toContain("type: 'bb'");
  });
  it('copies the latest settings without an apply step', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    mount();
    select(0, 'SOL/USDT');
    act(() => button('Bollinger').click());
    await act(async () => button('Copy link').click());
    const url = new URL(writeText.mock.calls[0][0]);
    const shared = JSON.parse(atob(url.searchParams.get('pg')));
    expect(shared.symbol).toBe('SOL/USDT');
    expect(shared.indicators).toEqual(['sma20', 'ema50', 'bb']);
  });
  it('restores a shared configuration on first render', () => {
    const config = { symbol: 'ETH/USDT', resolution: '4H', chartType: 'line', indicators: ['bb'] };
    window.history.replaceState({}, '', `/?pg=${btoa(JSON.stringify(config))}`);
    mount();
    expect(chart()).toMatchObject({ symbol: 'ETH/USDT', resolution: '4H', chartType: 'line' });
    expect(chart().indicators.map(i => i.type)).toEqual(['bb']);
    expect(snippet()).toContain("symbol: 'ETH/USDT'");
  });
});
