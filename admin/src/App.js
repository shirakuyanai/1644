import React, {useEffect, useState} from 'react'
export default function App() {
  const [brands, setBrands] = useState([{}])

  useEffect(() => {
    fetch('/brands')
    .then(res=>res.json())
    .then(data => {setBrands(data)})
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      {brands.map((brand, index) => (
        <p key={index}>{brand.name}</p>
      ))}
    </div>
  );
}