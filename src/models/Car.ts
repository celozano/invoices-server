import { prop as Property } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('CarInput')
export class Car {
  @Field()
  @Property()
  brand: string;

  @Field()
  @Property()
  model: string;

  @Field()
  @Property()
  year: string;

  @Field()
  @Property()
  plates: string;

  @Field()
  @Property()
  engine: string;

  @Field()
  @Property()
  liter: string;

  @Field()
  @Property()
  other: string;

  @Field()
  @Property()
  start_mileage: string;

  @Field()
  @Property()
  end_mileage: string;
}
