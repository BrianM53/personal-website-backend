import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, CreateUserSchema } from './validators/create-user.schema';
import { ZodValidationPipe } from '../common/pipes/zod.pipe';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class UserType {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  name: string;
}

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => String)
  async createUser(
    @Args('input', new ZodValidationPipe(CreateUserSchema))
    input: CreateUserInput,
  ) {
    await this.usersService.create(input);
    return 'User created';
  }
}
