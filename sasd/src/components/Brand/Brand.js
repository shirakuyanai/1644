import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const Brand = () => {
  const [brandData, setBrandData] = useState([]);

  const fetchBrandData = async () => {
    try {
      const res = await fetch("http://localhost:5000/brands", {
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
    } catch (error) {
      console.log("Error occurred while fetching brand data:", error);
    }
  };

  const deleteBrand = async (brandId) => {
    try {
      const res = await fetch(`http://localhost:5000/brands/delete/${brandId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const updatedBrandData = brandData.filter((brand) => brand._id !== brandId);
        setBrandData(updatedBrandData);
      } else {
        console.log("Failed to delete brand");
      }
    } catch (error) {
      console.log("Error occurred while deleting brand:", error);
    }
  };


  useEffect(() => {
    fetchBrandData();
  }, []);

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/brands/add" className="btn btn-primary">
              Add Brand
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">edit</th>
                <th scope="col">delete</th>

                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>

              {brandData.map((brand, id) => (
                <tr key={brand._id}>
                  <th scope="row">{brand._id}</th>
                  <td>{brand.name}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`/brands/edit/${brand._id}`}>
                      <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                    </NavLink>
                  </td>
                  <td><button
                    className="btn btn-danger"
                    onClick={() => deleteBrand(brand._id)}
                  >
                    <DeleteIcon />
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

export default Brand;
