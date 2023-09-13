/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Link from "next/link";
import React from "react";
import mongoose from 'mongoose';
import Product from "@/models/Product";

const Tshirts = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {products.map(item => {
             return (
               <div
                 key={item._id}
                 className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5"
               >
                 <Link passHref={true} href={`/product/${item.slug}`}>
                   <img
                     alt="ecommerce"
                     className="m-auto h-[30vh] md:h-[36vh] block"
                     src={item.img}
                   />
                 </Link>

                 <div className="text-center md:text-left mt-4">
                   <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                     T-Shirts
                   </h3>
                   <h2 className="text-gray-900 title-font text-lg font-medium">
                     {item.title}
                   </h2>
                   <p className="mt-1">₹{item.price}</p>
                   <p className="mt-1">S, M, L, XL, XXL</p>
                 </div>
               </div>
             ); 
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}
  let products = await Product.find({category: 'tshirt'});
  return { props: { products: JSON.parse(JSON.stringify(products)) } }
}

export default Tshirts;
