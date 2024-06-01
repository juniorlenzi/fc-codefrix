import { UUID } from '../../@shared/domain/value-objects/uuid.vo'
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

    expect(category.category_id).toBeInstanceOf(UUID)
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

    expect(category.category_id).toBeInstanceOf(UUID)
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
    expect(validateSpy).toHaveBeenCalledTimes(2)
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
    const id = new UUID()
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
    const arrange = [{ category_id: null }, { category_id: undefined }, { category_id: new UUID() }]

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any
      })

      expect(category.category_id).toBeInstanceOf(UUID)

      if (category_id instanceof UUID) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })
})
