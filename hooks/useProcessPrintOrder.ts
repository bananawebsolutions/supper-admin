import { useEffect, useRef } from "react";
import { useOrdersStore } from "@/store/ordersStore";
import { OrderData } from "@/components/order-details";

export const useProcessPrintOrder = (
    order: OrderData | null,
    printQuantities: boolean
) => {
    const addOrUpdateOrder = useOrdersStore((state) => state.addOrUpdateOrder);
    const hasProcessedOrder = useRef<boolean>(false);

    useEffect(() => {
        if (order?.items && printQuantities && !hasProcessedOrder.current) {
            order.items.forEach((item) => {
                addOrUpdateOrder({
                    product: item.title,
                    quantity: item.quantity || 0,
                    kgQuantity: item.kgQuantity || 0,
                    matureKgQuantity: item.matureQuantity || 0,
                    greenKgQuantity: item.greenQuantity || 0,
                });
            });
            hasProcessedOrder.current = true;
        }
    }, [order, addOrUpdateOrder, printQuantities]);
};
