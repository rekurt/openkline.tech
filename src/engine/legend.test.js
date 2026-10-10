import { describe, expect, it, vi } from 'vitest';
import { LegendRenderer } from './LegendRenderer';

const candle = { o: 42000, h: 42086.16, l: 41980.09, c: 42079.41, v: 5570 };
const theme = { text: '#fff', bullCandle: '#0f0', bearCandle: '#f00' };
function draw(width, value = candle, priceFormat, volumeFormat, messages) {
  const ctx = Object.fromEntries(['save', 'restore', 'beginPath', 'rect', 'clip', 'fillText'].map(key => [key, vi.fn()]));
  ctx.measureText = text => ({ width: text.length * 7 });
  new LegendRenderer().render(ctx, { chartLeft: 0, chartRight: width, chartTop: 0 }, value,
    'BTC/USDT', '1H', theme, priceFormat, volumeFormat, messages);
  return ctx;
}

describe('responsive chart legend', () => {
  it('keeps all OHLCV fields in their original order when they fit', () => {
    const ctx = draw(800);
    expect(ctx.fillText.mock.calls.map(([text]) => text)).toEqual([
      'BTC/USDT 1H', 'O 42000.00', 'H 42086.16', 'L 41980.09', 'C 42079.41', 'V 5.57K',
    ]);
    expect(ctx.restore).toHaveBeenCalledOnce();
  });
  it('keeps complete labels inside a mobile plot and prioritizes the close', () => {
    const ctx = draw(278);
    expect(ctx.fillText.mock.calls.map(([text]) => text)).toEqual(['BTC/USDT 1H', 'C 42079.41', 'V 5.57K', '…']);
    for (const [text, x] of ctx.fillText.mock.calls) {
      expect(x + ctx.measureText(text).width).toBeLessThanOrEqual(268);
    }
    expect(ctx.rect).toHaveBeenCalledWith(0, 0, 278, 28);
    expect(ctx.clip).toHaveBeenCalledOnce();
  });
  it('preserves custom formats and localized labels', () => {
    const ctx = draw(800, candle, n => n.toFixed(0), n => `${n} units`,
      { legendOpen: 'О', legendHigh: 'М', legendLow: 'Н', legendClose: 'З', legendVolume: 'V' });
    expect(ctx.fillText.mock.calls.map(([text]) => text)).toContain('З 42079');
    expect(ctx.fillText.mock.calls.map(([text]) => text)).toContain('V 5570 units');
  });
  it('does not draw an empty chart', () => {
    expect(draw(278, null).fillText).not.toHaveBeenCalled();
  });
});
