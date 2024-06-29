import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { Category } from './category.entity'
import { ClassValidatorFields } from '../../@shared/domain/validators/class-validator-fields'

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string | null

  @IsBoolean()
  is_active: boolean

  constructor({ name, description, is_active }: CategoryRules) {
    Object.assign(this, { name, description, is_active })
  }
}

class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(entity: Category) {
    return super.validate(new CategoryRules(entity))
  }
}

export class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator()
  }
}
