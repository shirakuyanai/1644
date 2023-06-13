import React from 'react';
import Brands from '../../components/dashboard/Brands';
import Slider from '../../components/dashboard/Slider';
import LastestProducts from '../../components/dashboard/LastestProducts';
import BestSeller from '../../components/dashboard/BestSeller';
import FeaturedProducts from '../../components/dashboard/FeaturedProducts';
import { useEffect } from 'react';
export default function Dashboard() {
  useEffect(() => {
    changeTitle('ATN Toys');
  });

  const changeTitle = data => {
    document.title = data;
  };

  return (
    <div>
      {/* Slider */}
      <Slider />
      {/* End of Slider */}

      {/* Brands */}
      <Brands />
      {/* End of Brands */}

      {/* Lastest Products */}
      <LastestProducts />
      {/* End of Lastest Products */}

      {/* Best Seller */}
      <BestSeller />
      {/* End of Best Seller */}

      {/* Featured Products */}
      <FeaturedProducts />
      {/* End of Featured Products */}
    </div>
  );
}
