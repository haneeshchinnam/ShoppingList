import { useEffect, useState } from "react";
import { Dashboard } from "../../components";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../services/product_service/productService";
import { useUpdateCartMutation } from "../../services";

const DashboardContainer = () => {
  const [products, setProducts] = useState<
    { id: string; name: string; price: number; quantity: number; categoryName: string }[]
  >([]);
  const { data: productList, refetch } = useGetProductsQuery();
  const { data: categoryList, refetch: refetchCategory } = useGetCategoriesQuery();
  const [ addCart ] = useUpdateCartMutation();

  useEffect(() => {
    if (productList && categoryList) {
      const tempProduct = productList.map((pro) => {
        const catName = categoryList.find((list) => list.id === pro.categoryId);
        return ({ name: pro.name, price: pro.price, quantity: pro.quantity, categoryName: catName ? catName.name : 'temp', id: pro.id });
      })
      setProducts(tempProduct);
    }
  }, [productList, categoryList]);

  const handleClick = (type: "add" | "remove" | "cart", index: number) => {
    if(type === 'cart' && productList) {
      try {
        addCart({productId: productList[index].id, count: 1}).unwrap().then((res) => { 
          console.log(res);
          refetch();
          refetchCategory();
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      <Dashboard products={products} handleClick={handleClick} />
      
    </div>
  );
};

export default DashboardContainer;
