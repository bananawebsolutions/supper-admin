"use server";

import { adminDB } from "@/firestoreAdmin";

interface Props {
    orderId: string;
    email: string;
}

export const getOrderData = async ({ orderId, email }: Props) => {
    try {
        const ordersRef = adminDB
            .collection("usersInfo")
            .doc(email)
            .collection("orders")
            .doc(orderId);

        const orderDoc = await ordersRef.get();

        if (!orderDoc.exists) {
            return null;
        }

        const result = {
            id: orderDoc.id,
            value: orderDoc.data()?.items,
            ...orderDoc.data(),
        };

        console.log(result.value);

        return result.id;
    } catch (error) {
        console.error("Error getting usersInfo data:", error);
        return null;
    }
};
