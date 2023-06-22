import React from 'react';

import Slider from '../../components/dashboard/Slider';
import LastestProducts from '../../components/dashboard/LastestProducts';
import BestSeller from '../../components/dashboard/BestSeller';
import FeaturedProducts from '../../components/dashboard/FeaturedProducts';
import { useEffect } from 'react';
export default function Dashboard({updateQuantity}) {
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

      {/* Lastest Products */}
      <LastestProducts updateQuantity={updateQuantity}/>
      {/* End of Lastest Products */}

      {/* Best Seller */}
      <BestSeller updateQuantity={updateQuantity}/>
      {/* End of Best Seller */}

      {/* Featured Products */}
      <FeaturedProducts updateQuantity={updateQuantity}/>
      {/* End of Featured Products */}
    </div>
  );
}
