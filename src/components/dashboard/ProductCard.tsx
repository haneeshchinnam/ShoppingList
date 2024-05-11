import { count } from "console";
import React from "react";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

interface IProductCardProps {
  name: string;
  price: number;
  quantity?: number;
  count?: number;
  categoryName?: string;
  status?: string;
  time?: string;
  handleClick?: (type: "add" | "remove" | "cart") => void;
}

function ProductCard({
  name,
  price,
  quantity,
  count,
  categoryName,
  status,
  handleClick,
  time,
}: IProductCardProps) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="flex gap-8 justify-between items-center">
          <div className="flex flex-col items-start">
            <p className="text-gray-700 text-base">Price: ${price}</p>
            {categoryName && <p className="text-gray-700 text-base">Category: {categoryName}</p>}
            {status && <p className="text-gray-700 text-base">Status: {status}</p>}
            {time && <p className="text-gray-700 text-base">date: {new Date(time).toLocaleDateString()}</p>}
          </div>
          <div className="flex gap-2 items-center">
            <CgMathPlus
              className="cursor-pointer"
              onClick={() => {
                if (handleClick) {
                  if (count) {
                    handleClick("add");
                  } else {
                    handleClick("cart");
                  }
                }
              }}
            />
            {count !== undefined && <div>{count}</div>}
            {count !== undefined && (
              <CgMathMinus
                className="cursor-pointer"
                onClick={() => {
                  if (handleClick) {
                    handleClick("remove");
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
