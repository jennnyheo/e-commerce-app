import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = (props) => {
  //this is page only available for users who already logged in!
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch save shipping address action
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Enter your Address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          placeholder="Enter your postal code"
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder="Enter your country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <div>
          <label></label>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
