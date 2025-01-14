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
    printQuantities: boolean;
    addOrUpdateOrder: (item: OrderItem) => void;
    setPrintQuantities: (value: boolean) => void;
    resetOrders: () => void;
    printProcess: boolean;
    setPrintProcess: (value: boolean) => void;
    loadingProcess: boolean;
    setLoadingProcess: (value: boolean) => void;
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
    printQuantities: false,
    setPrintQuantities: (value) => set({ printQuantities: value }),
    resetOrders: () => set({ totalOrders: [] }),
    printProcess: false,
    setPrintProcess: (value) => set({ printProcess: value }),
    loadingProcess: false,
    setLoadingProcess: (value) => set({ loadingProcess: value }),
}));
