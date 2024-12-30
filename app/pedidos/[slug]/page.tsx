"use client";

import OrderDetails from "@/components/order-details";
import { useSearchParams } from "next/navigation";

function OrderDetailsPage() {
    const params = useSearchParams();

    const orderId = params.get("orderId");
    const email = params.get("email");

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {orderId && email ? (
                <OrderDetails orderId={orderId} email={email} />
            ) : (
                <p className="text-red-500">
                    Error: No orderId or email provided
                </p>
            )}
        </main>
    );
}

export default OrderDetailsPage;
