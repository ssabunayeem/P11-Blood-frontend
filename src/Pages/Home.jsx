import React from 'react';
import Slider from '../components/Slider';
import CategorySection from '../components/CategorySection';
import OurFeatures from '../components/OurFeatures';
import ContactUs from '../components/ContactUs';


const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <CategorySection></CategorySection>
      <OurFeatures></OurFeatures>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
