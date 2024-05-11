import { useEffect, useState } from "react";
import { useGetCartQuery, useUpdateCartMutation } from "../../services";
import { ICart } from "../../interface";
import ProductCard from "../../components/dashboard/ProductCard";
import { useOrderProductMutation } from "../../services/order/orderService";

const CartContainer = () => {
  const { data: cartData, refetch } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [cart, setCart] = useState<ICart[]>([]);
  const [addCart] = useUpdateCartMutation();
  const [orderProduct] = useOrderProductMutation();

  const handleOrder = async () => {
    try {
      const res = await orderProduct().unwrap();
      if(res){
        refetch();
      }
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const handleClick = (type: "add" | "remove" | "cart", index: number) => {
    if (type === "add" && cart) {
      try {
        addCart({
          productId: cart[index].productId,
          count: cart[index].count + 1,
        })
          .unwrap()
          .then((res) => {
            console.log(res);
            refetch();
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "remove" && cart) {
      if (cart[index].count !== 1) {
        try {
          addCart({
            productId: cart[index].productId,
            count: cart[index].count - 1,
          })
            .unwrap()
            .then((res) => {
              console.log(res);
              refetch();
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between w-full"><p>Cart</p><button className="border-[1px] p-2" onClick={() => orderProduct()}>Order Products</button></div>
      <div className="flex flex-wrap gap-5">
        {cart.map((item, index) => (
          <ProductCard
            key={item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            handleClick={(type) => handleClick(type, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CartContainer;
