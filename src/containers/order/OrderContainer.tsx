import React, { useEffect, useState } from 'react'
import { useGetOrdersQuery } from '../../services/order/orderService';
import { IOrder } from '../../interface/order';
import ProductCard from '../../components/dashboard/ProductCard';

const OrderContainer = () => {
    const { data: orderData } = useGetOrdersQuery();
    const [order, setOrder] = useState<IOrder[]>([]);

    useEffect(() => {
        if(orderData) {
            setOrder(orderData);
        }
    }, [orderData])
  return (
    <div className='flex flex-col gap-6'>
        <p>Order</p>
        <div className='flex flex-wrap gap-8'>
            {
                order.map((list) => <ProductCard key={list.id} name={JSON.stringify(list.name)} price={list.price} time={list.timestamp} status={list.status} />)
            }
        </div>
    </div>
  )
}

export default OrderContainer;