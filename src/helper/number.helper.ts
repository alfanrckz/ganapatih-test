export function numberCurrencyID(value: any) {
  return `Rp. ${(parseFloat(value) || 0).toLocaleString('id-ID')}`
}
export function formatThousand(value: any, maxAfterComma: number = 2) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID', {
    maximumFractionDigits: maxAfterComma,
  })}`
}
export function formatPercentage(value: any, maxAfterComma: number = 1) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID', {
    maximumFractionDigits: maxAfterComma,
  })}`
}

export function localeFormatter(data: any) {
  data = parseFloat(data)
  return data ? data.toLocaleString('id-ID') : 0 //, { style: 'currency', currency: 'IDR' }
}

export const decimalNumberFormat = (number: any, afterComma: number = 1) => {
  return number ? number.toFixed(afterComma) : 0
}

const sufixes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const getBytes = (bytes: any) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return (!bytes && '0 Bytes') || (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sufixes[i]
}

export function numberFormatter(num: any, digits: any = 1, nunberFormatter: boolean = false) {
  num = Number(num)
  try {
    if (typeof num == 'number' && nunberFormatter) {
      if (num >= 1e3 && num < 1e6) {
        return (num / 1e3).toFixed(digits) + 'K'
      } else if (num >= 1e6 && num < 1e9) {
        return (num / 1e6).toFixed(digits) + 'M'
      } else if (num >= 1e9) {
        return (num / 1e9).toFixed(digits) + 'B'
      }
    }

    return formatThousand(num, digits)
  } catch (error) {
    return num
  }
}

export const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
  else return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

export const getMaxNumber = (numbers: number[]) => {
  let len = numbers.length
  let max = -Infinity

  while (len--) {
    max = numbers[len] > max ? numbers[len] : max
  }

  return max
}

/**
 * Formats a number into a compact Rupiah representation (e.g., Rp1K, Rp1M, Rp1B).
 * @param {number} value - The number to format.
 * @param {string} locale - The locale code (e.g., "id-ID" or "en-US").
 * @returns {string} - The formatted string with Rupiah prefix.
 */
export function moneyFormater(value: any, locale = 'id-ID') {
  const unitsIndo = ['', 'Rb', 'Jt', 'M', 'T'] // Common units in Indonesia
  const unitsEng = ['', 'K', 'M', 'B', 'T'] // Units in English

  const units = locale === 'id-ID' ? unitsIndo : unitsEng

  if (value < 1_000) return `${value.toLocaleString(locale)}` // No formatting needed

  const exponent = Math.floor(Math.log10(value) / 3)
  const scaledValue = (value / Math.pow(1_000, exponent)).toFixed(1)

  return `${scaledValue.replace(/\.0$/, '')}${units[exponent]}`
}