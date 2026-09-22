import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import NewArrivals from "../components/NewArrivals";
import RecentProducts from "../components/RecentProducts";
import Banner2 from "../components/Banner2";
import Review from "../components/Review";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <NewArrivals />
      <RecentProducts />
      <Banner2 />
      <Review />
      <Subscribe/>
      <Footer/>
    </div>
  );
};
