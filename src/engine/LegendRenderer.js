import { formatPrice, formatVolume } from '../../vendor/openkline/packages/core/src/utils';
import { DEFAULT_MESSAGES } from '../../vendor/openkline/packages/core/src/i18n/messages';
import { LEGEND_FONT, LEGEND_MARGIN_LEFT, LEGEND_MARGIN_TOP } from '../../vendor/openkline/packages/core/src/constants';

// Site adapter for the pinned engine: keep canvas labels inside the plot, and
// prioritize the close price when the full OHLCV row cannot fit.
export class LegendRenderer {
  render(ctx, layout, candle, symbol, resolution, theme,
    priceFormat = formatPrice, volumeFormat = formatVolume, messages = DEFAULT_MESSAGES) {
    if (!candle) return;
    ctx.save();
    ctx.font = LEGEND_FONT;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const left = layout.chartLeft + LEGEND_MARGIN_LEFT;
    const right = layout.chartRight - LEGEND_MARGIN_LEFT;
    const y = Math.round(layout.chartTop + LEGEND_MARGIN_TOP);
    const title = `${symbol} ${resolution}`;
    const values = [
      `${messages.legendOpen} ${priceFormat(candle.o)}`,
      `${messages.legendHigh} ${priceFormat(candle.h)}`,
      `${messages.legendLow} ${priceFormat(candle.l)}`,
      `${messages.legendClose} ${priceFormat(candle.c)}`,
      `${messages.legendVolume} ${volumeFormat(candle.v)}`,
    ];
    const full = [title, ...values];
    const parts = ctx.measureText(full.join('  ')).width <= right - left
      ? full : [title, values[3], values[4], values[0], values[1], values[2]];
    const gap = ctx.measureText('  ').width;
    const ellipsis = ctx.measureText('…').width;
    ctx.beginPath();
    ctx.rect(layout.chartLeft, layout.chartTop, Math.max(0, layout.chartRight - layout.chartLeft), 28);
    ctx.clip();
    let x = Math.round(left);
    for (const [i, part] of parts.entries()) {
      const width = ctx.measureText(part).width;
      const reserve = i < parts.length - 1 ? gap + ellipsis : 0;
      ctx.fillStyle = i === 0 ? theme.text : candle.c >= candle.o ? theme.bullCandle : theme.bearCandle;
      if (x + width + reserve > right) {
        if (x + ellipsis <= right) ctx.fillText('…', x, y);
        break;
      }
      ctx.fillText(part, x, y);
      x = Math.round(x + width + gap);
    }
    ctx.restore();
  }
}
