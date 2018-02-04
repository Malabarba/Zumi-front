import Money from '@/components/money'

export class Property {
  constructor({uniq_hash, address, photos, type, type_text,
               toilet_count, bath_count, bedroom_count,
               lot_size_m2, usable_size_m2, condo_cost_cents, floor}) {
    this.uniq_hash = uniq_hash
    this.address = address
    this.photos = photos // .map(p => new Photo(p))
    this.type = type
    this.type_text = type_text
    this.toilet_count = toilet_count
    this.bath_count = bath_count
    this.bedroom_count = bedroom_count
    this.lot_size_m2 = lot_size_m2
    this.usable_size_m2 = usable_size_m2
    this.condo_cost_cents = condo_cost_cents
    this.condo_cost = new Money(condo_cost_cents / 100)
    this.floor = floor
  }
}

class PropertyDetail {
  constructor(value, label, icon) {
    this.value = value
    this.label = label
    this.icon = icon
  }
}

export class Listing {
  static from(data) {
    return new Listing(data)
  }

  constructor({uniq_hash, property, price_cents, furnished, published_at, deleted_at}) {
    this.uniq_hash = uniq_hash
    this.property = new Property(property)
    this.price_cents = price_cents
    this.price = new Money(price_cents / 100)
    this.furnished = furnished
    this.published_at = published_at
    this.deleted_at = deleted_at

    const toilet = this.property.toilet_count - this.property.bath_count
    const toiletText = toilet > 0 ? ` + ${toilet}` : ''
    this.descList = [
      new PropertyDetail(this.property.bedroom_count.toString(), 'Quartos', 'bed'),
      new PropertyDetail(`${this.property.bath_count}${toiletText}`, 'Banheiros', 'bath'),
      new PropertyDetail(`${this.property.floor}º`, 'Andar', 'building'),
      new PropertyDetail(`${this.property.usable_size_m2}m²`, 'Área útil', 'crop'),
      new PropertyDetail(`${this.property.lot_size_m2}m²`, 'Área total', 'crop')
    ]
  }
}
