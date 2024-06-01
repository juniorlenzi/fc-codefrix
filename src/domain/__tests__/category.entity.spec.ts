import { Category } from '../category.entity'

describe('Category Unit Tests', () => {
  test('constructor', () => {
    let category = new Category({
      name: 'Movie'
    })

    expect(category.category_id).toBeUndefined()
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBe(true)
    expect(category.created_at).toBeInstanceOf(Date)
  })
  test('should create a category using static create method', () => {
    const createdAt = new Date()
    const category = Category.create({
      name: 'Movie',
      description: 'Movie Description',
      is_active: false
    })

    expect(category.category_id).toBeUndefined()
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('Movie Description')
    expect(category.is_active).toBe(false)
  })

  test('should change name', () => {
    const category = new Category({
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
    const category = new Category({
      name: 'Movie',
      description: 'Movie Description',
      is_active: false
    })

    const json = category.toJSON()

    expect(json).toEqual({
      category_id: undefined,
      name: 'Movie',
      description: 'Movie Description',
      is_active: false,
      created_at: expect.any(Date)
    })
  })
})
