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

        const usersRef = await adminDB
            .collection("usersInfo")
            .doc("fer.rojas95@gmail.com")
            .collection("orders")
            .doc(
                "cs_test_a14pc53TstOzSPeGV2AwgDmLb49NG4mpmQ3Gm7ggRoEycDfDHdIG6RyQpW"
            )
            .get();

        const result = {
            id: usersRef.id,
            value: usersRef.data()?.items,
            ...usersRef.data(),
        };
        console.log(result.value);
        // .where("_createdAt", ">=", startOfDay.toISOString())
        // .where("_createdAt", "<=", endOfDay.toISOString());

        return ["prueba", "prueba2"];

        // console.log(userDocs.docs);
        // let orders: any[] = [];

        // for (const userDoc of userDocs.docs) {
        //     const userEmail = userDoc.id;

        //     const ordersRef = usersRef.doc(userEmail).collection("orders");
        //     const orderDocs = await ordersRef.get();

        //     orderDocs.forEach((orderDoc) => {
        //         const data = orderDoc.data();
        //         orders.push({
        //             id: orderDoc.id,
        //             ...data,
        //         });
        //     });
        // }

        // return orders;

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
