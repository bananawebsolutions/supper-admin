import { useEffect } from "react";
import { useOrdersStore } from "@/store/ordersStore";
import { OrderData } from "@/components/order-details";

export const useProcessPrintOrder = (
    order: OrderData | null,
    printQuantities: boolean
) => {
    const addOrUpdateOrder = useOrdersStore((state) => state.addOrUpdateOrder);
    const printProcess = useOrdersStore((state) => state.printProcess);
    const setPrintProcess = useOrdersStore((state) => state.setPrintProcess);

    useEffect(() => {
        if (!printProcess && order?.items && printQuantities) {
            order.items.forEach((item) => {
                addOrUpdateOrder({
                    product: item.title,
                    quantity: item.quantity || 0,
                    kgQuantity: item.kgQuantity || 0,
                    matureKgQuantity: item.matureQuantity || 0,
                    greenKgQuantity: item.greenQuantity || 0,
                });
            });
            setPrintProcess(true);
        }
    }, [
        order,
        addOrUpdateOrder,
        printQuantities,
        setPrintProcess,
        printProcess,
    ]);
};
