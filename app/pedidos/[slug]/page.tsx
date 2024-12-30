"use client";

import OrderDetails from "@/components/order-details";
import { useSearchParams } from "next/navigation";

function OrderDetailsPage() {
    const params = useSearchParams();

    const orderId = params.get("orderId");
    const email = params.get("email");

    return (
        <div>
            {orderId && email ? (
                <OrderDetails orderId={orderId} email={email} />
            ) : (
                <p className="text-red-500">
                    Error: No orderId or email provided
                </p>
            )}
        </div>
    );
}

export default OrderDetailsPage;
