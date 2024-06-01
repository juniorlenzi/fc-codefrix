import { ValueObject } from '../value-object'

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}
class ComplexValueObject extends ValueObject {
  constructor(readonly value1: string, readonly value2: number) {
    super()
  }
}

describe('ValueObject Unit Tests', () => {
  it('should be equals', () => {
    const vo1 = new StringValueObject('test')
    const vo2 = new StringValueObject('test')

    expect(vo1.equals(vo2)).toBe(true)
  })
  it('should not be equals', () => {
    const vo1 = new StringValueObject('test')
    const vo2 = new StringValueObject('testa')

    expect(vo1.equals(vo2)).toBe(false)
  })

  it('should be equals with complex value object', () => {
    const vo1 = new ComplexValueObject('test', 1)
    const vo2 = new ComplexValueObject('test', 1)

    expect(vo1.equals(vo2)).toBe(true)
  })

  it('should not be equals with complex value object', () => {
    const vo1 = new ComplexValueObject('test', 1)
    const vo2 = new ComplexValueObject('test', 2)

    expect(vo1.equals(vo2)).toBe(false)
  })
})
