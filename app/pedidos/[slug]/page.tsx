"use client";

import OrderDetails from "@/components/order-details";
import { useSearchParams } from "next/navigation";

function OrderDetailsPage() {
    const params = useSearchParams();

    const orderId = params.get("orderId");
    const email = params.get("email");

    // TODO: Make the case that if the id does not match show a 404

    return (
        <div>
            <OrderDetails orderId={orderId} email={email} />
        </div>
    );
}

export default OrderDetailsPage;
