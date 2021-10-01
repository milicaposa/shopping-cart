import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

function Cart(props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const itemsInCart = props.itemsInCart;

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      email: email,
      name: name,
      address: address,
      itemsInCart: props.itemsInCart,
    };
    props.createOrder(order);
  };

  return (
    <div>
      {itemsInCart.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {itemsInCart.length} items in the cart{" "}
        </div>
      )}
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {itemsInCart.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => props.removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      {itemsInCart.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  itemsInCart.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={() => setShowCheckout(true)}
              >
                Proceed
              </button>
            </div>
          </div>
          {showCheckout && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        onChange={handleEmailInput}
                      ></input>
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        onChange={handleNameInput}
                      ></input>
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        onChange={handleAddressInput}
                      ></input>
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
