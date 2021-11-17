import { ModelType, UserType } from '../db'

export type Context = {
    Model: ModelType,
    authenticatedUser: UserType,
}