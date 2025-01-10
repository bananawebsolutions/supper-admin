"use server";

import { adminDB } from "@/firestoreAdmin";

// export const getOrdersData = async (date: Date) => {
export const getOrdersData = async () => {
    try {
        // const startOfDay = new Date(date);
        // console.log(startOfDay.toISOString());
        // startOfDay.setHours(0, 0, 0, 0);

        // const endOfDay = new Date(date);
        // endOfDay.setHours(23, 59, 59, 999);
        const usersRef = adminDB.collection("usersInfo");
        // .where("_createdAt", ">=", startOfDay.toISOString())
        // .where("_createdAt", "<=", endOfDay.toISOString());

        const userDocs = await usersRef.get();

        let orders: any[] = [];

        for (const userDoc of userDocs.docs) {
            const userEmail = userDoc.id;
            console.log("user Email", userEmail);

            const ordersRef = usersRef.doc(userEmail).collection("orders");
            const orderDocs = await ordersRef.get();
            console.log(
                "Number of orders for user",
                userEmail,
                ":",
                orderDocs.size
            );

            orderDocs.forEach((orderDoc) => {
                const data = orderDoc.data();
                console.log("Order Data:", data);
                orders.push({
                    id: orderDoc.id,
                    ...data,
                });
            });
        }

        return orders;

        // const orders = orderDocs.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        // }));

        // const orders = orderDocs.docs.map((doc) => {
        //     const data = doc.data();
        //     return {
        //         id: doc.id,
        //         ...data,
        //     };
        // });
    } catch (error) {
        console.error("Error getting usersInfo data:", error);
        return null;
    }
};
