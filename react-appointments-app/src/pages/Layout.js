import { Outlet, Link } from "react-router-dom";
import Header from '../shared/header/Header'
import Footer from '../shared/footer/Footer'

const Layout = () => {
  return (
    <>
      <Header name="My Appointments" />
      <Outlet />
      <Footer year={new Date().getFullYear()} />
    </>
  )
};

export default Layout;