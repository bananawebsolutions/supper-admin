"use client";

import OrderDetails from "@/components/order-details";
import { useParams } from "next/navigation";

function OrderDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const orderId = slug;

    // TODO: Make the case that if the id does not match show a 404

    return (
        <div>
            <OrderDetails orderId={orderId} />
        </div>
    );
}

export default OrderDetailsPage;
