"use server";

import { adminDB } from "@/firestoreAdmin";

export const getOrdersData = async (date: Date) => {
    try {
        const startOfDay = new Date(date);
        console.log(startOfDay.toISOString());
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const ordersRef = adminDB
            .collection("usersInfo")
            .where("_createdAt", ">=", startOfDay.toISOString())
            .where("_createdAt", "<=", endOfDay.toISOString());

        const orderDocs = await ordersRef.get();

        const orders = orderDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return orders;
    } catch (error) {
        console.error("Error getting userInfo data:", error);
        return null;
    }
};
