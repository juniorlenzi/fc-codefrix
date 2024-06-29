import { EntityValidationError } from '../../../@shared/domain/validators/validation.error'
import { Uuid } from '../../../@shared/domain/value-objects/uuid.vo'
import { Category } from '../category.entity'

describe('Category Unit Tests', () => {
  let validateSpy: any
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate')
  })

  test('constructor', () => {
    let category = new Category({
      name: 'Movie'
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBe(true)
    expect(category.created_at).toBeInstanceOf(Date)
  })
  test('should create a category using static create method', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'Movie Description',
      is_active: false
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movie Description')
    expect(category.is_active).toBe(false)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should change name', () => {
    const category = Category.create({
      name: 'Movie'
    })

    category.changeName('Movies')
    expect(category.name).toBe('Movies')
  })

  test('should change description', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.changeDescription('Movie Description')
    expect(category.description).toBe('Movie Description')
  })

  test('should activate', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.activate()
    expect(category.is_active).toBe(true)
  })

  test('should deactivate', () => {
    const category = new Category({
      name: 'Movie',
      is_active: false
    })

    category.deactivate()
    expect(category.is_active).toBe(false)
  })

  test('should convert to JSON', () => {
    const id = new Uuid()
    const category = new Category({
      category_id: id,
      name: 'Movie',
      description: 'Movie Description',
      is_active: false
    })

    const json = category.toJSON()

    expect(json).toEqual({
      category_id: id.id,
      name: 'Movie',
      description: 'Movie Description',
      is_active: false,
      created_at: expect.any(Date)
    })
  })

  describe('category_id field', () => {
    const arrange = [{ category_id: null }, { category_id: undefined }, { category_id: new Uuid() }]

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any
      })

      expect(category.category_id).toBeInstanceOf(Uuid)

      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })
})

describe('Category Validator', () => {
  describe('create command', () => {
    test('should an invalid category with name property', () => {
      const arrange = []

      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
      })

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: ['name should not be empty']
      })

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
      })

      expect(() => Category.create({ name: 't'.repeat(256) })).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters']
      })
    })

    it('should a invalid category using description property', () => {
      expect(() => Category.create({ description: 5 } as any)).containsErrorMessages({
        description: ['description must be a string']
      })
    })

    it('should a invalid category using is_active property', () => {
      expect(() => Category.create({ is_active: 5 } as any)).containsErrorMessages({
        is_active: ['is_active must be a boolean value']
      })
    })
  })

  describe('changeName method', () => {
    it('should a invalid category using name property', () => {
      const category = Category.create({ name: 'Movie' })
      expect(() => category.changeName(null)).containsErrorMessages({
        name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
      })

      expect(() => category.changeName('')).containsErrorMessages({
        name: ['name should not be empty']
      })

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
      })

      expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters']
      })
    })
  })

  describe('changeDescription method', () => {
    it('should a invalid category using description property', () => {
      const category = Category.create({ name: 'Movie' })
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: ['description must be a string']
      })
    })
  })
})
