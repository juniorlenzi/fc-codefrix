export abstract class Entity {
  abstract toJSON(): object
  abstract get entityId(): string
}
