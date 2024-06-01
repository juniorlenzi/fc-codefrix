import { UUID } from '../uuid.vo'
import { v4 as uuidv4 } from 'uuid'

const uuid = uuidv4()

describe('UUID Unit Tests', () => {
  const validateSpy = jest.spyOn(UUID.prototype as any, 'validate')
  it('should create a UUID', () => {
    const uuid = new UUID()

    expect(uuid.id).toBeDefined()
  })

  it('should throw an error if the UUID is not valid', () => {
    expect(() => new UUID('not-a-uuid')).toThrow(new Error('ID must be a valid UUID'))
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should validate the UUID', () => {
    const generatedUUid = new UUID(uuid)

    expect(generatedUUid.id).toBe(uuid)
  })
})
