import React from 'react';
// import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <CartPage/>,
  },
  {
    path: "/checkout",
    element: <CheckoutPage/>,
  },
  {
    path: "/productdetail",
    element: <ProductDetailPage/>,
  },
]);


function App() {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
