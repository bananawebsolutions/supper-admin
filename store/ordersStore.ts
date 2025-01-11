import { create } from "zustand";

interface OrderItem {
    product: string;
    quantity: number;
    kgQuantity: number;
    greenKgQuantity: number;
    matureKgQuantity: number;
}

interface OrdersState {
    totalOrders: OrderItem[];
    addOrUpdateOrder: (item: OrderItem) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
    totalOrders: [],
    addOrUpdateOrder: (item) =>
        set((state) => {
            const existingItemIndex = state.totalOrders.findIndex(
                (order) => order.product === item.product
            );

            if (existingItemIndex !== -1) {
                // Update existing item
                const updatedOrders = [...state.totalOrders];
                updatedOrders[existingItemIndex] = {
                    ...updatedOrders[existingItemIndex],
                    quantity:
                        updatedOrders[existingItemIndex].quantity +
                        item.quantity,
                    kgQuantity:
                        updatedOrders[existingItemIndex].kgQuantity +
                        item.kgQuantity,
                };
                return { totalOrders: updatedOrders };
            } else {
                // Add new item
                return { totalOrders: [...state.totalOrders, item] };
            }
        }),
}));
