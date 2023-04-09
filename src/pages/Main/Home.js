import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrand } from "../../features/filter/filterSlice";
import { getProducts } from './../../features/products/productsSlice';

const Home = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const { products, isLoading } = useSelector(state => state.products);
  const { stock, brands } = filter;

  useEffect(() => {
    // fetch("https://moon-tech-server-wheat.vercel.app/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data.data));

    dispatch(getProducts());
  }, [dispatch]);

  let content;

  if (isLoading) {
    content = <h2>Loading...</h2>
  }

  if (products?.length) {
    content = products.map((product =>
      <ProductCard key={product.model} product={product}></ProductCard>
    ))
  }

  if (products?.length && (stock || brands.length)) {
    content = products.filter((product) => {
      if (stock) {
        return product.status === true
      }
      else {
        return product
      }
    })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand)
        }
        else {
          return product
        }
      })
      .map((product) =>
        <ProductCard key={product.model} product={product}></ProductCard>
      )
  }

  const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${activeClass} `}
        >
          In Stock
        </button>
        <button onClick={() => dispatch(toggleBrand('amd'))} className={`border px-3 py-2 rounded-full font-semibold`}>
          AMD
        </button>
        <button onClick={() => dispatch(toggleBrand('intel'))} className={`border px-3 py-2 rounded-full font-semibold`}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
