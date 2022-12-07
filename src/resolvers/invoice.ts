import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import {
  createInvoice,
  Invoice,
  InvoiceInput,
  InvoiceModel,
} from '../models/Invoice';

import { Context as ApolloContext } from 'apollo-server-core';

interface Context extends ApolloContext {
  user: any;
}

@Resolver()
export class InvoiceResolver {
  @Query(() => String)
  async ping() {
    return 'pong';
  }

  @Authorized()
  @Query(() => Invoice)
  async getInvoice(@Arg('invoice_number') invoice_number: number) {
    return await InvoiceModel.findOne({ invoice_number });
  }

  @Authorized()
  @Query(() => [Invoice])
  async getInvoices() {
    return await InvoiceModel.find({});
  }

  @Authorized()
  @Mutation(() => Invoice)
  async createInvoice(
    @Arg('data') invoice: InvoiceInput,
    @Ctx() ctx: Context
  ): Promise<Invoice> {
    const username = ctx.user.email.split('@')[0];
    return await createInvoice({
      ...invoice,
      created_at: new Date(),
      created_by: username,
    });
  }
}
