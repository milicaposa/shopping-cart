import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("itemsInCart")
      ? JSON.parse(localStorage.getItem("itemsInCart"))
      : []
  );

  const createOrder = (order) => {
    alert(
      "need to save order for: " + order.name + order.email + order.address
    );
  };

  const removeFromCart = (product) => {
    const itemsInCart = cartItems.slice();
    setCartItems(itemsInCart.filter((x) => x._id !== product._id));
    localStorage.setItem(
      "itemsInCart",
      JSON.stringify(itemsInCart.filter((x) => x._id !== product._id))
    );
  };

  const addToCart = (product) => {
    const itemsInCart = cartItems.slice();
    let alreadyInCart = false;

    itemsInCart.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      itemsInCart.push({ ...product, count: 1 });
    }
    setCartItems(itemsInCart);
    localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
  };

  const sortProducts = (event) => {
    const sort = event.target.value;
    setSort(sort);
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  };

  const filterProducts = (event) => {
    const filter = event.target.value;

    if (filter === "") {
      setSize(filter);
      setProducts(data.products);
    } else {
      setSize(filter);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(filter) >= 0
        )
      );
    }
  };

  return (
    <div className="grid-container">
      <header>
        <a href="#">React Shopping Cart App</a>
      </header>
      <main>
        <div className="content">
          <div className="main-content">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              sortProducts={sortProducts}
              filterProducts={filterProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              itemsInCart={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All rigthts reserved</footer>
    </div>
  );
}

export default App;
