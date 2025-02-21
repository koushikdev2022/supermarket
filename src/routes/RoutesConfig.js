
import OutsideLayout from '../ui/layout/OutsideLayout.jsx';
import InsideLayout from '../ui/layout/InsideLayout.jsx';
import MyProfile from '../pages/Profile/MyProfile.jsx';
import CategoriesList from '../pages/CategoriesList/CategoriesList.jsx';
import ProductList from '../pages/ProductList/ProductList.jsx';
import ProductDetails from '../pages/ProductDetails/ProductDetails.jsx';
import Cart from '../pages/Cart/Cart.jsx';
import Payment from '../pages/Payment/Payment.jsx';
import Login from '../pages/Auth/Login.jsx';
import Registration from '../pages/Auth/Registration.jsx';
import Home from '../pages/Home/home.jsx';
import OrderList from '../pages/OrderList/OrderList.jsx';
import OrderDetails from '../pages/OrderList/OrderDetails.jsx';
import Favorite from '../pages/Profile/Favorite.jsx';
import Addresses from '../pages/Profile/Addresses.jsx';



// const Home = React.lazy(() => import('../pages/Home/home.jsx'));


const allRoutes = [
  {
    path: '/',
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/home',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/registration',
    children: [{ index: true, element: <Registration /> }],
  },
  {
    path: '/categories-list',
    element: <OutsideLayout />,
    children: [{ index: true, element: <CategoriesList /> }],
  },
  {
    path: '/product-list/:id',
    element: <OutsideLayout />,
    children: [{ index: true, element: <ProductList /> }],
  },
  {
    path: '/product-details',
    element: <OutsideLayout />,
    children: [{ index: true, element: <ProductDetails /> }],
  },
  {
    path: '/cart',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Cart /> }],
  },
  {
    path: '/payment',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Payment /> }],
  },
  {
    path: '/order-list',
    element: <OutsideLayout />,
    children: [{ index: true, element: <OrderList /> }],
  },
  {
    path: '/details',
    element: <OutsideLayout />,
    children: [{ index: true, element: <OrderDetails /> }],
  },

  {
    path: '/myprofile',
    element: <OutsideLayout />,
    children: [{ index: true, element: <MyProfile /> }],
  },
  {
    path: '/favorite',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Favorite /> }],
  },
  {
    path: '/addresses',
    element: <OutsideLayout />,
    children: [{ index: true, element: <Addresses /> }],
  },

  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;



