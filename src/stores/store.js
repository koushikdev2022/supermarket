import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducers/AuthSlice';
import CharacterSlice from '../reducers/CharacterSlice';
import PlanSlice from '../reducers/PlanSlice';
import MyProfileSlice from '../reducers/MyProfileSlice';
import PaymentSlice from '../reducers/PaymentSlice';
import ContactSlice from '../reducers/ContactSlice';
import getMegamenuList from '../reducers/MenuSlice';
import getProductList from '../reducers/ProductListSlice';
import addProductInList from '../reducers/AddToCardSlice';
// import addToCart  from '../reducers/CartSlice';
import getCartItemList from '../reducers/CartItemSlice';
import getCategoryAttributeDetail from '../reducers/CategoryAttributeDetailSlice';
import removeSpecificCartItem from '../reducers/RemoveSpecificCartItemSlice';
import OrderSlice from '../reducers/OrderSlice';
import AddAddressSlice from '../reducers/AddAddressSlice'
import PricingSearchSlice from '../reducers/PricingSearchSlice'
import HomeSlice from '../reducers/HomeSlice'
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    character: CharacterSlice,
    plans: PlanSlice,
    profile: MyProfileSlice,
    payment: PaymentSlice,
    contact: ContactSlice,
    megamenu: getMegamenuList,
    productlist: getProductList,
    addProductlist: addProductInList,
    // addToCart:addToCart,
    cartItemList: getCartItemList,
    categoryDetails: getCategoryAttributeDetail,
    removeSpecificCartItem: removeSpecificCartItem,
    orders: OrderSlice,
    address: AddAddressSlice,
    //pricing search
    pSearch: PricingSearchSlice,
    homes: HomeSlice,
  },
  devTools: import.meta.env.DEV,
});

export default store;
