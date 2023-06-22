import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbaar from './components/Navbaar';
import User from './components/User/User';
import userRegister from './components/User/userRegister';
import userEdit from './components/User/userEdit';
import userDetails from './components/User/userDetails';
import {Switch,Route} from "react-router-dom"
import Product from './components/Product/Product';
import EditProduct2 from './components/Product/editProduct2';
import AddProduct from './components/Product/addProduct';
import Brand from './components/Brand/Brand';
import AddBrand from './components/Brand/addBrand';
import BrandEdit from './components/Brand/editBrand';





function App() {
  return (
   <>
    <Navbaar />
    <Switch>
      <Route exact path="/users" component={User} />
      <Route exact path="/users/register" component={userRegister} />
      <Route exact path="/users/edit/:id" component={userEdit} />
      <Route exact path="/users/view/:id" component={userDetails} />
      <Route exact path="/products" component={Product} />
      <Route exact path="/products/edit/:id" component={EditProduct2} />
      <Route exact path="/products/add" component={AddProduct} />
      <Route exact path="/brands" component={Brand} />
      <Route exact path="/brands/add" component={AddBrand} />
      <Route exact path="/brands/edit/:id" component={BrandEdit} />
    </Switch>
   
   </>
  );
}

export default App;






