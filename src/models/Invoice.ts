import { getModelForClass, pre, prop as Property } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

import { Car } from './Car';
import { Client } from './Client';
import { CounterModel } from './Counter';

@ObjectType()
@InputType('RowInput')
class Row {
  @Field()
  @Property()
  description: string;

  @Field()
  @Property()
  quantity: number;

  @Field()
  @Property()
  rate: number;

  @Field()
  @Property()
  has_tax: boolean;

  @Field()
  @Property()
  tax_rate: number;

  @Field()
  @Property()
  total: number;
}

@ObjectType()
@pre<Invoice>('save', async function () {
  let doc = await CounterModel.findOneAndUpdate(
    { _id: 'invoice_number' },
    { $inc: { sequence: 1 } },
    { new: true }
  )
    .lean()
    .exec();

  if (doc === null || doc === undefined) {
    doc = await CounterModel.create({ _id: 'invoice_number', sequence: 1 });
  }

  this.invoice_number = doc.sequence;
})
export class Invoice {
  @Field()
  @Property()
  invoice_number: number;

  @Field()
  @Property()
  client: Client;

  @Field()
  @Property()
  car: Car;

  @Field()
  @Property()
  created_at: Date;

  @Field(() => [Row])
  @Property({ type: () => Row, default: [] })
  rows: Row[];

  @Field()
  @Property()
  subtotal: number;

  @Field()
  @Property()
  tax: number;

  @Field()
  @Property()
  total: number;

  @Field()
  @Property()
  amount_paid: number;

  @Field()
  @Property()
  created_by: string;
}

@InputType()
export class InvoiceInput implements Partial<Invoice> {
  @Field()
  @Property()
  client: Client;

  @Field()
  @Property()
  car: Car;

  @Field(() => [Row])
  @Property({ type: () => Row, default: [] })
  rows: Row[];

  @Field()
  @Property()
  subtotal: number;

  @Field()
  @Property()
  tax: number;

  @Field()
  @Property()
  total: number;

  @Field()
  @Property()
  amount_paid: number;
}

export const InvoiceModel = getModelForClass(Invoice);

export const createInvoice = (invoice: InvoiceInput) => {
  return InvoiceModel.create({
    ...invoice,
    created_at: new Date(),
    created_by: 'carlos',
  });
};
