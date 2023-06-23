import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata} from '../context/ContextProvider';
import { updatedata } from '../context/ContextProvider';

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const { udata} = useContext(adddata);
  const { updata } = useContext(updatedata);
  // const { dltdata, setDLTdata } = useContext(deldata);

  const fetchProductData = async () => {
    const res = await fetch("https://atn-toy-server.onrender.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setProductData(data);
      console.log("get data");
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`https://atn-toy-server.onrender.com/products/delete/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200) {
        const updatedProductData = productData.filter((product) => product._id !== productId);
        setProductData(updatedProductData);
      } else {
        console.log("Failed to delete product");
      }
    } catch (error) {
      console.log("Error occurred while deleting product:", error);
    }
  };
  const fetchBrandData = async () => {
    const res = await fetch("https://atn-toy-server.onrender.com/brands", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setBrandData(data);
      console.log("get brand data");
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchBrandData();
  }, []);

  const getBrandName = (brandId) => {
    const brand = brandData.find((brand) => brand._id === brandId);
    return brand ? brand.name : "";
  };

  return (
    <>
      {/* Display success message when adding a product */}
      {udata && (
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{udata.name}</strong> added successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* Display success message when updating a product */}
      {updata && (
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{updata.name}</strong> updated successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* Display success message when deleting a product */}
      {/* {dltdata && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{dltdata.name}</strong> deleted successfully!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )} */}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/products/add" className="btn btn-primary">
              Add Product
            </NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">brand</th>
                <th scope="col">price</th>
                <th scope="col">stock</th>
                <th scope="col">description</th>
                <th scope="col">image</th>
                <th scope="col">View</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>

              </tr>
            </thead>
            <tbody>
              {productData.map((product, id) => (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td>{product.name}</td>
                  <td>{getBrandName(product.brand)}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.description}</td>
                  <td>
                    <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                    
                  </td>
                  <td><NavLink to={`/products/view/${product._id}`}>
                      <button className="btn btn-success">
                        <RemoveRedEyeIcon />
                      </button>
                    </NavLink></td>
                    <td><NavLink to={`/products/edit/${product._id}`}>
                      <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                    </NavLink></td>
                    <td><button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>
                      <DeleteOutlineIcon />
                    </button></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Product;
