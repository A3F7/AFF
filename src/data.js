/* Business data: measurement spec, indicative pricing, WhatsApp order builder. */

export const WHATSAPP_NUMBER = '201093096278'
export const WHATSAPP_DISPLAY = '+20 109 309 6278'
export const BASE_PRICE = 1300

/**
 * Extra prices are indicative and shown live; the final figure for extras is
 * confirmed by the master tailor before cutting (kept in one place to edit).
 */
export const EXTRAS_PRICE = {
  lining: 200,
  embroidery: 100,
  pocket: 150,
}

/** Per-fabric surcharge on top of the base price. */
export const FABRIC_PRICE = {
  wool: 0,
  'wool-premium': 250,
  linen: 150,
  velvet: 400,
}

/** Zones are aligned by index with i18n.measure.steps (8 entries). */
export const MEASURES = [
  { id: 'height', min: 100, max: 250, unit: 'cm', kind: 'len' },
  { id: 'weight', min: 30, max: 250, unit: 'kg', kind: 'weight' },
  { id: 'neck', min: 20, max: 70, unit: 'cm', kind: 'girth' },
  { id: 'shoulder', min: 30, max: 70, unit: 'cm', kind: 'len' },
  { id: 'chest', min: 50, max: 180, unit: 'cm', kind: 'girth' },
  { id: 'waist', min: 40, max: 170, unit: 'cm', kind: 'girth' },
  { id: 'sleeve', min: 35, max: 95, unit: 'cm', kind: 'len' },
  { id: 'jacketLength', min: 30, max: 120, unit: 'cm', kind: 'len' },
]

export const COLOUR_HEX = {
  navy: '#1E2F4F',
  charcoal: '#33363B',
  black: '#16181C',
  forest: '#22453C',
  grey: '#6E7681',
  burgundy: '#5B2233',
  camel: '#B08A54',
  cream: '#E7DFCE',
}

export function priceBreakdown(cfg) {
  const fabric = FABRIC_PRICE[cfg.fabric] ?? 0
  let extras = 0
  if (cfg.lining) extras += EXTRAS_PRICE.lining
  if (cfg.embroidery) extras += EXTRAS_PRICE.embroidery
  if (cfg.pocket) extras += EXTRAS_PRICE.pocket
  return { base: BASE_PRICE, fabric, extras, total: BASE_PRICE + fabric + extras }
}

export function isMeasureValid(raw, spec) {
  if (raw === null || raw === undefined || String(raw).trim() === '') return false
  const n = Number(String(raw).replace(',', '.'))
  if (!Number.isFinite(n)) return false
  return n >= spec.min && n <= spec.max
}

export function allMeasuresFilled(values) {
  return MEASURES.every((m, i) => isMeasureValid(values[i], m))
}

/** Build the prefilled WhatsApp message for the order. */
export function buildOrderMessage({ lang, cfg, values, total }) {
  const L = (en, ar) => (lang === 'ar' ? ar : en)
  const fabricLabel = cfg.fabricLabel || cfg.fabric
  const colourLabel = cfg.colourLabel || cfg.colour
  const lines = []

  lines.push(L('*New jacket order — Ahmed Fayed*', '*طلب جاكيت جديد — أحمد فايد*'))
  lines.push('')

  lines.push(L('*Jacket*', '*الجاكيت*'))
  lines.push(
    L(`• Fabric: ${fabricLabel}`, `• القماش: ${fabricLabel}`)
  )
  lines.push(L(`• Colour: ${colourLabel}`, `• اللون: ${colourLabel}`))
  lines.push(
    L(
      `• Silk lining: ${cfg.lining ? 'Yes' : 'No'}`,
      `• بطانة حرير: ${cfg.lining ? 'أيوه' : 'لا'}`
    )
  )
  lines.push(
    L(
      `• Embroidered name: ${cfg.embroidery ? cfg.embroideryName || 'Yes' : 'No'}`,
      `• تطريز اسم: ${cfg.embroidery ? cfg.embroideryName || 'أيوه' : 'لا'}`
    )
  )
  lines.push(
    L(
      `• Extra pocket: ${cfg.pocket ? 'Yes' : 'No'}`,
      `• جيب إضافي: ${cfg.pocket ? 'أيوه' : 'لا'}`
    )
  )
  lines.push(L(`• Indicative total: ${total} EGP`, `• الإجمالي التقديري: ${total} جنيه`))
  lines.push('')

  lines.push(L('*Measurements (cm / kg)*', '*المقاسات (سم / كجم)*'))
  MEASURES.forEach((m, i) => {
    const v = values[i]
    const filled = isMeasureValid(v, m)
    const name = L(
      ['Height', 'Weight', 'Neck', 'Shoulder', 'Chest', 'Waist', 'Sleeve length', 'Jacket length'][i],
      [
        'الطول',
        'الوزن',
        'محيط الرقبة',
        'عرض الكتف',
        'محيط الصدر',
        'محيط الوسط',
        'طول الكم',
        'طول الجاكيت',
      ][i]
    )
    lines.push(
      `• ${name}: ${filled ? `${String(v).replace(',', '.')} ${m.unit}` : L('—', '—')}`
    )
  })
  lines.push('')
  lines.push(
    L(
      'Sizes and extras price to be confirmed by the master tailor. صنع في مصر.',
      'المقاسات وسعر الإضافات سيتأكدان مع الأسطى. صنع في مصر.'
    )
  )

  return lines.join('\n')
}

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
