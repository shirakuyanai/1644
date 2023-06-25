import React, {useEffect, useState} from 'react'

export default function Brands(){
  const [brands, setBrands] = useState([])
  useEffect(() => {
    document.title = 'Brands';
    getBrands()  
  },[])


  const getBrands = async () => {
      try {
          const token = localStorage.getItem('token')
          const response = await fetch('http://localhost:5000/brands', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
              credentials: 'include',
          })
          if (response.ok){
              const data = await response.json()
              setBrands(data)
          }
      }
      catch (e){
          console.error(e)
      }
  }

  const deleteBrand = async (brandId) => {
    e.preventDefault();
    try {
      const confirm = window.confirm('Are you sure you want to delete this brand? This is a destructive action and it cannot be undone.')
      if (confirm){
        const res = await fetch(`http://localhost:5000/brands/delete/${brandId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          alert('Brand deleted successfully!')
          const updateBrands = brands.filter((brand) => brand._id !== brandId);
          setBrands(updateBrands);
        } else {
          console.log("Failed to delete brand");
        }
    }
    } catch (error) {
      console.log("Error occurred while deleting brand:", error);
    }
  };


  return (
    <div>
    {/* <!-- Content Header (Page header) --> */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Brands</h1>
          </div>
          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/index">Home</a></li>
              <li className="breadcrumb-item active">Brands</li>
            </ol>
          </div>
        </div>
      </div>
      {/* <!-- /.container-fluid --> */}
    </section>
    <div className='ml-2 mb-2'>
        <a className='btn btn-primary' href='/brand/add'>New Brand</a>
    </div>
    {/* <!-- Main content --> */}
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Brands</h3>
        </div>
        {/* <!-- /.card-header --> */}
        <div className="card-body">
            <table className="table table-striped projects">
                    <thead>
                        <tr>
                            <th style={{width: '1%'}} className="text-center">
                                #
                            </th>
                            <th style={{width: '1%'}} className="text-center">
                                ID
                            </th>
                            <th style={{width: '20%'}} className="text-center">
                                Name
                            </th>
                            <th style={{width: '20%'}} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {brands && brands.length > 0 ? (
                        brands.map((brand, index) => (
                            <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{brand._id}</td>
                            <td className="text-center">{brand.name}</td>
                            <td className="project-actions text-center">
                                <a className="btn btn-info btn-sm" href={`/brand/edit/${brand._id}`}>
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                                </a>
                                <a className="btn btn-danger btn-sm" onClick={() => deleteBrand(brand._id)} >
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