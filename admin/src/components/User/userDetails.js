import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams();
  console.log(id);

  const history = useHistory();

  const getdata = async () => {
    const res = await fetch(`https://atn-toy-server.onrender.com/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log('error');
    } else {
      setUserdata(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`https://atn-toy-server.onrender.com/products/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log('error');
    } else {
      console.log('user deleted');
      history.push('/');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-3">
      <div>
        <h1 style={{ fontWeight: 400 }}>Welcome</h1>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <div className="add_btn">
              <NavLink to={`/users/edit/${getuserdata._id}`}>
                <button className="btn btn-primary mx-2">
                  <CreateIcon />
                </button>
              </NavLink>
              <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}>
                <DeleteOutlineIcon />
              </button>
            </div>
            <div className="row">
              <div className="left_view col-lg-6 col-md-6 col-12">
                <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                <h3 className="mt-3">
                  First name: <span>{getuserdata.firstname}</span>
                </h3>
                <h3 className="mt-3">
                  Last name: <span>{getuserdata.lastname}</span>
                </h3>
                <p className="mt-3">
                  <MailOutlineIcon />Email: <span>{getuserdata.email}</span>
                </p>
              </div>
              <div className="right_view  col-lg-6 col-md-6 col-12">
                <p className="mt-5">
                  <PhoneAndroidIcon />phone: <span>+84 {getuserdata.phone}</span>
                </p>
                <p className="mt-3">
                  <VerifiedUserIcon />Verified: <span> {String(getuserdata.verified)}</span>
                </p>
                <p className="mt-3"><PersonIcon/>
                  Role: <span>{getuserdata.role}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Details;
