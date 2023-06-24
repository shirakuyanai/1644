import React, {useEffect, useState} from 'react'

export default function Brands(){
    const [brands, setBrands] = useState([])
    useEffect(() => {
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
  return (
    <div className="content-wrapper">
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
                            <td className="text-center">{brand._id}</td>
                            <td className="text-center">{brand.name}</td>
                            <td className="project-actions text-center">
                                <a className="btn btn-info btn-sm" href="{{ path('app_category_edit', {'id': category.id}) }}">
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                                </a>
                                <a className="btn btn-danger btn-sm" href="{{ path('app_category_delete', {'id': category.id}) }}" onClick="return confirm('Are you sure you want to delete this category?')">
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