"use client";

import { useState, useEffect } from "react";

const usePaymentsData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStripeData = async () => {
            try {
                const response = await fetch("/api/get-payments-data", {
                    method: "POST",
                });
                const result = await response.json();

                if (result.success) {
                    setData(result.data);
                } else {
                    throw new Error(
                        result.message || "Failed to fetch payments data"
                    );
                }
            } catch (error) {
                //@ts-expect-error error is type unknown
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStripeData();
    }, []);

    return { data, loading, error };
};

export default usePaymentsData;
