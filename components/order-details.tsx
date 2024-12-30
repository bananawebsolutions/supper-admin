import { useOrderData } from "@/hooks/useOrderData";

interface Props {
    orderId: string;
    email: string;
}

interface ProductData {
    _createdAt: string;
    _rev: string;
    _id: string;
    title: string;
    bestseller: boolean;
    brand: string;
    description: string;
    price: number;
    image: { _type: string; asset: { _ref: string; _type: string } };
    productCategory: string;
    productType: string;
    quantity: number;
    slug: { current: string; _type: string };
}

interface OrderData {
    items: ProductData[];
    amount: number;
    shipping: number;
}

function OrderDetails({ orderId, email }: Props) {
    const {
        data: order,
        error,
        loading,
    } = useOrderData({ orderId, email }) as unknown as {
        data: OrderData | null;
        error: string | null;
        loading: boolean;
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div>
            OrderDetails
            <div>
                {order?.items?.map((item: ProductData) => (
                    <div key={item._id}>{item.title}</div>
                ))}
            </div>
        </div>
    );
}

export default OrderDetails;
