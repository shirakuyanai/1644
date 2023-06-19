import React from "react";

export default function Slider(){
    return (
        <div className="slider mb-4">
          <div className="owl-carousel owl-one owl-theme">
              <div className="item">
                  <div className="slider-img w-100">
                      <img src="../assets/images/slide/2.jpg" alt=""/></div>
              </div>
              <div className="item">
                  <div className="slider-img w-100"><img src="../assets/images/slide/1.jpg" alt=""/></div>
              </div>
              <div className="item">
                  <div className="slider-img"><img src="../assets/images/slide/2.png" alt=""/></div>    
              </div>
          </div>
      </div>
    )
}