import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('ClientInput')
export class Client {
  @Field()
  @Property()
  first_name: string;

  @Field()
  @Property()
  last_name: string;

  @Field()
  @Property()
  phone: string;
}

export const ClientModel = getModelForClass(Client);
