import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest, { params }: { params: { action: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action } = params;

  switch (action) {
    case 'cancel':
      return await cancelSubscription(userId);
    case 'reactivate':
      return await reactivateSubscription(userId);
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

async function cancelSubscription(userId: string) {
  try {
    // TODO: Retrieve the user's Stripe customer ID from your database
    const customerId = 'stripe_customer_id_here';

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    const subscription = await stripe.subscriptions.update(subscriptions.data[0].id, {
      cancel_at_period_end: true,
    });

    // TODO: Update the user's subscription status in your database

    return NextResponse.json({ message: 'Subscription cancelled successfully', subscription });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 });
  }
}

async function reactivateSubscription(userId: string) {
  try {
    // TODO: Retrieve the user's Stripe customer ID from your database
    const customerId = 'stripe_customer_id_here';

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    const subscription = await stripe.subscriptions.update(subscriptions.data[0].id, {
      cancel_at_period_end: false,
    });

    // TODO: Update the user's subscription status in your database

    return NextResponse.json({ message: 'Subscription reactivated successfully', subscription });
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    return NextResponse.json({ error: 'Failed to reactivate subscription' }, { status: 500 });
  }
}