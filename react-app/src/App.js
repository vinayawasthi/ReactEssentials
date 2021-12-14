import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Vehicles from './components/Vehicles';
import AddOrUpdateVehicle from './components/AddOrUpdateVehicle';
import './shared/styles/app.css';

function useQuery() {
  return new URLSearchParams(window.location.search);
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/add-vehicle" element={<AddOrUpdateVehicle />} />
          <Route path="/update-vehicle" element={<AddOrUpdateVehicle  vehicleId={useQuery().get("id")}  />} />
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
