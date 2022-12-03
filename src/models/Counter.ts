import { Field } from 'type-graphql';
import { getModelForClass, prop as Prop } from '@typegoose/typegoose';

export class Counter {
  @Field()
  @Prop()
  _id: string;

  @Field()
  @Prop()
  sequence: number;
}

export const CounterModel = getModelForClass(Counter);
