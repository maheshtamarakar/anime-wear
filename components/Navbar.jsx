import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white">
        <div className="logo mx-5">
          <Link href={"/"}>
            <Image width={200} height={40} src="/myLogo.png" alt="" />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}>
              <li>Tshirts</li>
            </Link>
            <Link href={"/hoodies"}>
              <li>Hoodies</li>
            </Link>
            <Link href={"/stickers"}>
              <li>Stickers</li>
            </Link>
            <Link href={"/mugs"}>
              <li>Mugs</li>
            </Link>
          </ul>
        </div>
        <div className="cart absolute right-0 mx-5 top-4 flex">
          <Link href={'/login'}><MdAccountCircle className="text-xl md:text-2xl cursor-pointer mx-2" /></Link>
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl cursor-pointer"
          />
        </div>
        <div
          ref={ref}
          className={`w-72 h-[100vh] sideCart absolute top-0 right-0 bg-red-100 py-10 px-8 transform transition-transform ${
            Object.keys(cart).length !== 0
              ? "translate-x-0"
              : "translate-x-full"
          } `}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-2 right-2 cursor-pointer text-2xl"
          >
            <AiOutlineCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="my-4 font-semibold">Your cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">{cart[k].name}</div>
                    <div className="flex font-semibold justify-center items-center w-1/3 text-sm">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-red-500"
                      />
                      <span className="mx-2">{cart[k].qty}</span>{" "}
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-red-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
          <div className="flex">
            <Link href={"/checkout"}>
              <button className="flex text-white bg-red-500 border-0 py-2 px-4 mr-2 focus:outline-none hover:bg-red-600 rounded text-sm">
                {" "}
                <BsFillBagCheckFill className="m-1" /> Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex text-white bg-red-500 border-0 py-2 px-4 mr-2 focus:outline-none hover:bg-red-600 rounded text-sm"
            >
              {" "}
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
