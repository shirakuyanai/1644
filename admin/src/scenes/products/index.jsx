import React, {useEffect, useState} from 'react'

export default function Products(){
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  useEffect(() => {
      getProducts()
  }, [products])

  const getProducts = async () => {
    try{
      const response = await fetch('https://atn-toy-server.onrender.com/products', {
        method: 'GET',
        credentials: 'include'
      })
      if (response.ok){
        setProducts(await response.json())
      }
    } catch (e){
      console.error(e)
    }
  }

  const deleteProduct = async (productId, e) => {
    e.preventDefault();
    try {
      const confirm = window.confirm('Are you sure you want to delete this product? This action cannot be undone.')
      if (confirm){
        const token = localStorage.getItem('token')
        const res = await fetch(`https://atn-toy-server.onrender.com/products/delete/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          credentials: 'include'
        });
        if (res.ok) {
          alert('Product deleted successfully')
          const updatedProducts = products.filter((product) => product._id !== productId);
          setProducts(updatedProducts)
        } else {
          alert("Failed to delete product");
        }
      }
    } catch (error) {
      alert("Error occurred while deleting product:", error);
    }
  };

  return (
    <div>
    {/* <!-- Content Header (Page header) --> */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Products</h1>
          </div>
          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/index">Home</a></li>
              <li className="breadcrumb-item active">Products</li>
            </ol>
          </div>
        </div>
      </div>
      {/* <!-- /.container-fluid --> */}
    </section>
    <div className='ml-2 mb-2'>
        <a className='btn btn-primary' href='/product/add'>New Product</a>
    </div>
    {/* <!-- Main content --> */}
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Products</h5>
          <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus"></i>
              </button>
              
              <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times"></i>
              </button>
          </div>
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body">
          <table className="table table-striped projects">
            <thead>
                  <tr>
                      <th style={{width: '1%'}} className="text-center">
                          #
                      </th>
                      <th style={{width: '1%'}} className="text-center d-none d-lg-table-cell">
                          ID
                      </th>
                      <th style={{width: '1%'}} className="text-center d-none d-lg-table-cell">
                          Image
                      </th>
                      <th style={{width: '20%'}} className="text-center">
                          Name
                      </th>
                      <th style={{width: '20%'}} className="text-center">
                          Price
                      </th>
                      <th style={{width: '20%'}} className="text-center">
                          Stock
                      </th>
                      <th style={{width: '20%'}} className="text-center">Action</th>
                  </tr>
            </thead>
            <tbody>
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <tr key={index}>
                          <td className="text-center"><a href={`/product/${product._id}`}>{index + 1}</a></td>
                          <td className="text-center d-none d-lg-table-cell">{product._id}</td>
                          <td className="text-center d-none d-lg-table-cell"><img style={{width: 200 + 'px', height: 200 + 'px'}}src={product.image}/></td>
                          <td className="text-center">{product.name}</td>
                          <td className="text-center">${product.price}</td>
                          <td className="text-center">{product.stock}</td>
                          <td className="project-actions text-center">
                              <a className="btn btn-info btn-sm" href={`/product/edit/${product._id}`}>
                              <i className="fas fa-pencil-alt"></i>
                              Edit
                              </a>
                              <a className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>
                              <i className="fas fa-trash"></i>
                              Delete
                              </a>
                          </td>
                        </tr>
                    ))
                ) : null}
            </tbody>
          </table>
        </div>
        {/* <!-- /.card-body --> */}
        </div>
    
      {/* <!-- /.card --> */}
    </section>
    {/* <!-- /.content --> */}
  </div>
  )
}