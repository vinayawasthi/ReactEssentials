import { Outlet, Link } from "react-router-dom";
import Header from '../shared/header/Header'
import Footer from '../shared/footer/Footer'

const Layout = () => {
  return (
    <>
      <Header name="Rajasthan" />
      <Outlet />
      <Footer year={new Date().getFullYear()} />
    </>
  )
};

export default Layout;