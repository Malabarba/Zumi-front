const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export default class Money {
  static fromString(s, {min = 0, max = Number.MAX_VALUE}) {
    const value = parseInt(s.replace(/\D+/g, ''), 10)
    if (isNaN(value)) {
      return null
    } else if (value < min) {
      return new Money(min)
    } else if (value > max) {
      return new Money(max)
    } else {
      return new Money(value)
    }
  }

  constructor(amount) {
    this.amount = amount
    this.formatted = formatter.format(amount)
  }

  toString() {
    return this.formatted
  }
}
