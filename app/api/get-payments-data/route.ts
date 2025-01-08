import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async () => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Missing Stripe Key");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
        const payments = await stripe.checkout.sessions.list({
            status: "complete",
        });

        return NextResponse.json(
            {
                success: true,
                data: payments.data,
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
