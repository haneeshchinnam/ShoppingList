import React from "react";
import ProductCard from "./ProductCard";

interface IDashboardProps {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    categoryName: string;
  }[];
  handleClick: (type: "add" | "remove" | "cart", index: number) => void;
}

const Dashboard = ({ products, handleClick }: IDashboardProps) => {
  return (
    <div className="container mx-auto flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center cursor-pointer">
        Product List
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            categoryName={product.categoryName}
            handleClick={(type) => handleClick(type, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
