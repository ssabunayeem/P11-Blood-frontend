import React from 'react';
import Slider from '../components/Slider';
import CategorySection from '../components/CategorySection';
import OurFeatures from '../components/OurFeatures';
import ContactUs from '../components/ContactUs';
import ArrowAnimated from '../components/ArrowAnimated';


const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <ArrowAnimated></ArrowAnimated>
      <CategorySection></CategorySection>
      <ContactUs></ContactUs>
      <OurFeatures></OurFeatures>
    </div>
  );
};

export default Home;
