import { Field, InputType } from '@nestjs/graphql';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  name: string;
}
