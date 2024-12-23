"use server";

import { adminDB } from "@/firestoreAdmin";

export interface ClientData {
    email: string;
    name?: string;
}

const clientsRef = adminDB.collection("users"); // Get a reference to the 'clients' collection

export const getClientsData = async () => {
    try {
        const querySnapshot = await clientsRef.get(); // Get all documents in the 'clients' collection
        const clientsData = querySnapshot.docs.map((doc) => doc.data()); // Extract the data from each document

        const result = clientsData.map((client) => {
            return {
                email: client.email,
                name: client.name,
            };
        });

        return result;
    } catch (error) {
        console.error("Error getting clients data:", error);
        return null;
    }
};
