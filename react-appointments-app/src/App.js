import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import AppointmentList from './components/AppointmentList';
import './shared/styles/app.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <React.Fragment>
    //   <Header name="Rajasthan" />
    //   {/* <AddOrUpdateVehicle vehicleId={1} key="121" /> */}
    //   {/* <AddOrUpdateVehicle /> */}
    //   {/* <Vehicles /> */}
    //   <Footer year={new Date().getFullYear()} />
    // </React.Fragment>
  )
}

export default App;
