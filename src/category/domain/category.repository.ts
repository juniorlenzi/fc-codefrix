import { IRespository } from '../../shared/domain/repository/repository.interface'
import { UUID } from '../../shared/domain/value-objects/uuid.vo'
import { Category } from './category.entity'

export interface ICategoryRepository extends IRespository<Category, UUID> {}
