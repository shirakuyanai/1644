import { useEffect, useState } from 'react'

export default function Nav(){
    const [brands, setBrands] = useState([])
    const [newBrand, setNewBrand] = useState("")

    useEffect(() => {
        getBrand()
    }, [])
  
    const getBrand = () => {
      fetch('/brands')
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.log(err))
    }
    
    const addBrand = async () => {
        const data = await fetch('/newbrand', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({
            name: newBrand
          })
        })
        .then( res => res.json())
        setBrands([...brands, data])
        setNewBrand("")
      }
    return (
        <div className="navigation">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div id="navigation">
                            <ul>
                                <li className="active"><a href="/index">Home</a></li>
                                <li className="has-sub"><a href="#">Brands</a>
                                    <ul>
                                        {brands.map((item, index) => (
                                            <li key={index}><a href="#">{item.name}</a></li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}