import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import {
  createInvoice,
  Invoice,
  InvoiceInput,
  InvoiceModel,
} from '../models/Invoice';

@Resolver()
export class InvoiceResolver {
  @Query(() => String)
  async ping() {
    return 'pong';
  }

  @Query(() => Invoice)
  async getInvoice(@Arg('invoice_number') invoice_number: number) {
    return await InvoiceModel.findOne({ invoice_number });
  }

  @Query(() => [Invoice])
  async getInvoices() {
    return await InvoiceModel.find({});
  }

  @Mutation(() => Invoice)
  async createInvoice(@Arg('data') invoice: InvoiceInput): Promise<Invoice> {
    return await createInvoice(invoice);
  }
}