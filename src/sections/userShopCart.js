import React from "react";
import "./usershopping.scss";

export const UserShopppingCart = (props) => {
  return (
    <div id="shopify-section-cart-template" className="shopify-section">
      <div className="breadcrumb ">
        <a href="/" data-translate="general.breadcrumbs.home">
          Home
        </a>
        <span className="arrow">
          <i className="fa fa-angle-right" aria-hidden="true" />
        </span>
        <span>Shopping cart</span>
      </div>
      <header className="page-header">
        <h1>My Cart</h1>
      </header>
      <div className="wallet-cart">
        <div id="wk_get_cashback" customer_id={5963032822013} />
        <div
          id="wk_pay_wallet"
          customer_id={5963032822013}
          customer_email="verma.saurav7@gmail.com"
        />
      </div>

      <form
        className="cart-form wrapper-cart-template"
        action="/cart"
        method="post"
        noValidate
      >
        <div className="left-col cart_items">
          <div className="cart-header">
            <div className="cart--title">Products</div>
            <div className="cart--price">Price</div>
            <div className="cart--quantity h-mobile">Qty</div>
            <div className="cart--total h-mobile">Total</div>
            <div className="cart--remove h-mobile"></div>
          </div>
          <ul className="cart-list">
            <li
              className="cart-product-item"
              data-product_id={6835042222261}
              data-item-id={40470762848437}
            >
              <div className="details">
                <div className="cart-thumb cart--title">
                  <a
                    className="product-img"
                    href="/products/shoes-slippers-3d-novelty-novelty?variant=40470762848437"
                  >
                    <img
                      src="//cdn.shopify.com/s/files/1/0577/1925/9317/products/76_5ec7eb4b-1b9e-4ca9-bf20-6e5981f1c7b0_160x.jpg?v=1630317555"
                      alt="Space Jam Tweety Bird Slippers - S / Yellow"
                    />
                  </a>
                  <div className="cart--info">
                    <a
                      href="/products/shoes-slippers-3d-novelty-novelty?variant=40470762848437"
                      className="product-name"
                    >
                      <span>Space Jam Tweety Bird Slippers</span>
                    </a>
                    <div className="size">
                      <small>S / Yellow</small>
                      <a
                        href="JavaScript:void(0);"
                        className="product-details__edit"
                        data-cart-edit
                        aria-label="link"
                        data-url="/products/shoes-slippers-3d-novelty-novelty?variant=40470762848437&view=cart_edit"
                        data-id={40470762848437}
                        data-quantity={1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                          viewBox="0 0 48 48"
                          width="144px"
                          height="144px"
                        >
                          <path d="M 10.5 6 C 7.468 6 5 8.468 5 11.5 L 5 36 C 5 39.309 7.691 42 11 42 L 22.605469 42 C 22.858469 41.042 23.225516 39.759 23.728516 38 L 11 38 C 9.897 38 9 37.103 9 36 L 9 16 L 39 16 L 39 22.521484 C 39.427 22.340484 39.8615 22.188422 40.3125 22.107422 C 40.7065 22.036422 41.102859 21.992953 41.505859 22.001953 C 42.015859 22.001953 42.515 22.067641 43 22.181641 L 43 11.5 C 43 8.468 40.532 6 37.5 6 L 10.5 6 z M 13.5 20 A 1.50015 1.50015 0 1 0 13.5 23 L 15.5 23 A 1.50015 1.50015 0 1 0 15.5 20 L 13.5 20 z M 21.5 20 C 20.672 20 20 20.671 20 21.5 C 20 22.329 20.672 23 21.5 23 L 34.5 23 C 35.328 23 36 22.329 36 21.5 C 36 20.671 35.328 20 34.5 20 L 21.5 20 z M 41.498047 24 C 41.224047 24.001 40.946969 24.025172 40.667969 24.076172 C 39.783969 24.235172 38.939563 24.696156 38.226562 25.410156 L 26.427734 37.208984 C 26.070734 37.565984 25.807969 38.011141 25.667969 38.494141 L 24.097656 43.974609 C 24.025656 44.164609 23.993 44.365406 24 44.566406 C 24.013 44.929406 24.155594 45.288406 24.433594 45.566406 C 24.710594 45.843406 25.067688 45.986 25.429688 46 C 25.630688 46.007 25.834391 45.975344 26.025391 45.902344 L 31.505859 44.332031 C 31.988859 44.192031 32.431062 43.930266 32.789062 43.572266 L 44.589844 31.773438 C 45.303844 31.060437 45.764828 30.216031 45.923828 29.332031 C 45.973828 29.053031 45.997047 28.775953 45.998047 28.501953 C 46.001047 27.307953 45.540687 26.179312 44.679688 25.320312 C 43.820687 24.460313 42.692047 23.998 41.498047 24 z M 13.5 26 A 1.50015 1.50015 0 1 0 13.5 29 L 15.5 29 A 1.50015 1.50015 0 1 0 15.5 26 L 13.5 26 z M 21.5 26 C 20.672 26 20 26.671 20 27.5 C 20 28.329 20.672 29 21.5 29 L 31.808594 29 L 34.779297 26.027344 C 34.688297 26.010344 34.596 26 34.5 26 L 21.5 26 z M 13.5 32 A 1.50015 1.50015 0 1 0 13.5 35 L 15.5 35 A 1.50015 1.50015 0 1 0 15.5 32 L 13.5 32 z M 21.5 32 C 20.672 32 20 32.671 20 33.5 C 20 34.329 20.672 35 21.5 35 L 25.808594 35 L 28.808594 32 L 21.5 32 z" />
                        </svg>
                      </a>
                    </div>
                    <div className="properties" />
                  </div>
                </div>

                <div className="cart--price h-mobile">
                  <div className="price-box">
                    <span>$34.00</span>
                  </div>
                </div>
                <div className="cart--quantity h-mobile">
                  <div className="qty-group" id="update-40470762848437">
                    <input
                      type="number"
                      name="updates[]"
                      id="updates_40470762848437"
                      defaultValue={1}
                      data-line={4}
                      min={1}
                      className="update-cart--template"
                    />
                  </div>
                </div>
                <div className="cart--total h-mobile">
                  <span className="price" data-price={3400}>
                    $34.00
                  </span>
                </div>
                <div className="cart--remove h-mobile">
                  <a
                    className="remove"
                    href="/cart/change?line=1&quantity=0"
                    data-id={40470762848437}
                  >
                    <svg
                      aria-hidden="true"
                      data-prefix="fal"
                      data-icon="times"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className="svg-inline--fa fa-times fa-w-10 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                        className
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </li>
            <li
              className="cart-product-item"
              data-product_id={7037980901557}
              data-item-id={41222332711093}
            >
              <div className="details">
                <div className="cart-thumb cart--title">
                  <a
                    className="product-img"
                    href="/products/seamed-zip-up-denim-jacket?variant=41222332711093"
                  >
                    <img
                      src="//cdn.shopify.com/s/files/1/0577/1925/9317/products/Large-00410706-01-1_front_160x.jpg?v=1633941755"
                      alt="Seamed Zip-Up Denim Jacket - S / Denim"
                    />
                  </a>
                  <div className="cart--info">
                    <a
                      href="/products/seamed-zip-up-denim-jacket?variant=41222332711093"
                      className="product-name"
                    >
                      <span>Seamed Zip-Up Denim Jacket</span>
                    </a>
                    <div className="size">
                      <small>S / Denim</small>
                    </div>
                    <div className="properties" />
                  </div>
                </div>

                <div className="cart--price h-mobile">
                  <div className="price-box">
                    <span>$35.00</span>
                  </div>
                </div>
                <div className="cart--quantity h-mobile">
                  <div className="qty-group" id="update-41222332711093">
                    <input
                      type="number"
                      name="updates[]"
                      id="updates_41222332711093"
                      defaultValue={3}
                      data-line={6}
                      min={1}
                      className="update-cart--template"
                    />
                  </div>
                </div>
                <div className="cart--total h-mobile">
                  <span className="price" data-price={3500}>
                    $105.00
                  </span>
                </div>
                <div className="cart--remove h-mobile">
                  <a
                    className="remove"
                    href="/cart/change?line=2&quantity=0"
                    data-id={41222332711093}
                  >
                    <svg
                      aria-hidden="true"
                      data-prefix="fal"
                      data-icon="times"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className="svg-inline--fa fa-times fa-w-10 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                        className
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="right-col">
          <label>Enter promo code</label>
          <div className="cart-header-1">
            <input type="text" placeholder="Promo Code" />
            <div
              className="btn btn-checkout"
              type="submit"
              name="checkout"
              defaultValue="Proceed to Checkout"
            >
              Submit
            </div>
          </div>
          <div className="cart-header">
            <div className="cart--title summary">Order Summary</div>
          </div>
          <div className="groued-info">
            <div style={{ display: "none" }} data-cart-discount-wrapper>
              <div className="order-discount-card-wrapper" data-cart-discount>
                <span className="order-discount order-discount--title order-discount--cart">
                  <svg className="icon icon-saletag" id="icon-saletag">
                    <path
                      d="M10 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3H7a1 1 0 0 0-.71.29l-6 6a1 1 0 0 0 0 1.42l4 4a1 1 0 0 0 1.42 0c.19-.2 5.8-5.81 6-6A1 1 0 0 0 12 5V2a2 2 0 0 0-2-2z"
                      fill="#231F20"
                    />
                  </svg>
                  <span data-cart-discount-title />
                </span>
                <span className="order-discount order-discount--cart order-discount--cart-total">
                  -<span data-cart-discount-amount />
                </span>
              </div>
            </div>
            <div className="total">
              <span className="label">
                <span>Discount:</span>
              </span>
              <span className="price">$0.00</span>
            </div>
            <div className="total">
              <span className="label">
                <span>Sub Total:</span>
              </span>
              <span className="price">$139.00</span>
            </div>
          </div>
          <div className="grouped-bottom">
            <div className="total">
              <span className="label">
                <span>Total:</span>
              </span>
              <span className="price">$139.00</span>
            </div>
            <div className="btn-actions">
              <div
                className="btn btn-checkout"
                type="submit"
                name="checkout"
                defaultValue="Proceed to Checkout"
              >
                Proceed to Checkout
              </div>
              <div className="btn btn-continue" href="/collections/all">
                Continue Shopping
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="no-item-cart" style={{ display: "none" }}>
        <p className="alert alert-warning">Your cart is currently empty.</p>
        <p className="cart-empty">
          Continue browsing <a href="/collections/all">here</a>.
        </p>
      </div>
    </div>
  );
};
