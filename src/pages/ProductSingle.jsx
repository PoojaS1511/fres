import React from 'react';
import { Link } from 'react-router-dom';

const ProductSingle = () => {
  return (
    <>
      <div className="py-1 bg-primary">
        <div className="container">
          <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
            <div className="col-lg-12 d-block">
              <div className="row d-flex">
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-phone2" />
                  </div>
                  <span className="text">+91 903570789</span>
                </div>
                <div className="col-md pr-4 d-flex topper align-items-center">
                  <div className="icon mr-2 d-flex justify-content-center align-items-center">
                    <span className="icon-paper-plane" />
                  </div>
                  <span className="text">FRESHPICK@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">FRESHPICK</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav">
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
              <li className="nav-item active dropdown">
                <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">Shop</Link>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/shop">Shop</Link>
                </div>
              </li>
              <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-wrap hero-bread" style={{ backgroundImage: `url('images/bg_1.jpg')` }}>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 ftco-animate text-center">
              <p className="breadcrumbs">
                <span className="mr-2"><Link to="/">Home</Link></span>
                <span className="mr-2"><Link to="/">Product</Link></span>
                <span>Product Single</span>
              </p>
              <h1 className="mb-0 bread">Product Single</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 ftco-animate">
              <a href="images/product-1.jpg" className="image-popup">
                <img src="images/product-1.jpg" className="img-fluid" alt="Bell Pepper" />
              </a>
            </div>
            <div className="col-lg-6 product-details pl-md-5 ftco-animate">
              <h3>B Grade Yellow Preserved Bell Pepper</h3>
              <div className="rating d-flex">
                <p className="text-left mr-4">
                  <a href="#" className="mr-2">5.0</a>
                  {[...Array(5)].map((_, i) => (
                    <a key={i} href="#"><span className="ion-ios-star-outline" /></a>
                  ))}
                </p>
                <p className="text-left mr-4">
                  <a href="#" className="mr-2" style={{ color: '#000' }}>100 <span style={{ color: '#bbb' }}>Rating</span></a>
                </p>
                <p className="text-left">
                  <a href="#" className="mr-2" style={{ color: '#000' }}>500 <span style={{ color: '#bbb' }}>Sold</span></a>
                </p>
              </div>
              <p className="price"><span>₹100/Kg</span></p>
              <p>
                Packaging Size: 10 Kg<br />
                Color: Yellow<br />
                Quality: B Grade<br />
                Packaging Type: Net Bag<br />
                Country of Origin: Made in India
              </p>
              <p>We are instrumental in offering a wide range of Preserved Bell Pepper. Features:</p>
              <ul>
                <li>Low in calories</li>
                <li>Contain plenty of vitamin C</li>
                <li>Contain several phytochemicals and carotenoids</li>
              </ul>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group d-flex">
                    <div className="select-wrap">
                      <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                      <select className="form-control">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                        <option>Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-100" />
                <div className="input-group col-md-6 d-flex mb-3">
                  <span className="input-group-btn mr-2">
                    <button type="button" className="quantity-left-minus btn" data-type="minus">
                      <i className="ion-ios-remove"></i>
                    </button>
                  </span>
                  <input type="text" className="form-control input-number" value="1" min="1" max="100" readOnly />
                  <span className="input-group-btn ml-2">
                    <button type="button" className="quantity-right-plus btn" data-type="plus">
                      <i className="ion-ios-add"></i>
                    </button>
                  </span>
                </div>
                <div className="w-100" />
                <div className="col-md-12">
                  <p style={{ color: '#000' }}>600 kg available</p>
                </div>
              </div>
              <p><Link to="/contact" className="btn btn-black py-3 px-5">Contact Supplier</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-12 heading-section text-center ftco-animate">
              <span className="subheading">Products</span>
              <h2 className="mb-4">Related Products</h2>
              <p>Eat fresh and be healthy</p>
            </div>
          </div>

          <div className="row">
            {[1, 2, 3, 4].map((i) => (
              <div className="col-md-6 col-lg-3 ftco-animate" key={i}>
                <div className="product">
                  <a href="#" className="img-prod">
                    <img className="img-fluid" src={`images/product-${i}.jpg`} alt="Product" />
                    {i === 1 && <span className="status">30%</span>}
                    <div className="overlay" />
                  </a>
                  <div className="text py-3 pb-4 px-3 text-center">
                    <h3><a href="#">Product {i}</a></h3>
                    <div className="d-flex">
                      <div className="pricing">
                        <p className="price"><span>₹120.00</span></p>
                      </div>
                    </div>
                    <div className="bottom-area d-flex px-3">
                      <div className="m-auto d-flex">
                        <a href="#" className="add-to-cart d-flex justify-content-center align-items-center text-center">
                          <span><i className="ion-ios-menu" /></span>
                        </a>
                        <a href="#" className="buy-now d-flex justify-content-center align-items-center mx-1">
                          <span><i className="ion-ios-cart" /></span>
                        </a>
                        <a href="#" className="heart d-flex justify-content-center align-items-center">
                          <span><i className="ion-ios-heart" /></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSingle;
