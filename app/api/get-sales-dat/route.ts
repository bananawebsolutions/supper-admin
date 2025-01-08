import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async () => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Missing Stripe Key");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
        const sales = await stripe.paymentIntents.list();

        return NextResponse.json(
            {
                success: true,
                data: sales.data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Stripe API Fatal Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error,
            },
            { status: 500 }
        );
    }
};
