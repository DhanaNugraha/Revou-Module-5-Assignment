import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import ProductListing from "@/components/ProductListing";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import CategoryList from "@/components/CategoryList";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import Searchbar from "@/components/Searchbar";
import SortProduct from "@/components/SortProduct";

// client side 
const CategoryPage = ({data}:any) => {
  // initial fallback value
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const categoryFetched = data.slice(0, 5);

  const [searchProduct, setSearchProduct] = useState("");

  const [productDisplayedCount, setProductDisplayedCount] = useState(0);

  const [sortValue, setSortValue] = useState("Default");

  let currentCategory: any = ""

  categoryFetched.map((category: any) =>
    {
      if (router.query.categoryId === category.id) {
        currentCategory = category.name
      }
    }
  )

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/shopping-bag.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={`Shop Free ${currentCategory} category page. Find your favorite ${currentCategory} here.`} />
        <meta name="keyword" content={currentCategory} />
        <meta name="author" content="Dhana Nugraha" />
        <title>{`Shop Free: ${currentCategory} category`}</title>
      </Head>

      <Toaster />

      <NavBar />

      <Searchbar 
      searchProduct={searchProduct}
      setSearchProduct={setSearchProduct} 
      />

      <CategoryList data = {data}/>

      <section className="productSortingContainer">
        <p className={"productDisplayedCount"}>
          { `Showing ${productDisplayedCount} products` +  `${searchProduct === "" ? "" : ` for "${searchProduct}" `}`}
        </p>

        <SortProduct 
        setSortValue = {setSortValue}
        />          
      </section>

      <ProductListing 
      categoryId = {router.query.categoryId} 
      searchProduct = {searchProduct} 
      setProductDisplayedCount = {setProductDisplayedCount}
      sortValue = {sortValue}/>

      <Footer />
    </>
  );
};

// Server Side 
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories/");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};

export default CategoryPage;
