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

        const users = userDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("users:", users);

        return users;

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
        console.error("Error getting userInfo data:", error);
        return null;
    }
};
