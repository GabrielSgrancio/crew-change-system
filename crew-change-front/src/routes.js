import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ShipList from './components/ShipList';
import ShipForm from './components/ShipForm';
import CrewMemberList from './components/CrewMemberList';
import CrewMemberForm from './components/CrewMemberForm';
import FlightList from './components/FlightList';
import FlightForm from './components/FlightForm';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/ships" element={<ShipList />} />
    <Route path="/ships/add" element={<ShipForm />} />
    <Route path="/ships/edit/:id" element={<ShipForm />} />
    <Route path="/crewmembers" element={<CrewMemberList />} />
    <Route path="/crewmembers/add" element={<CrewMemberForm />} />
    <Route path="/crewmembers/edit/:id" element={<CrewMemberForm />} />
    <Route path="/flights" element={<FlightList />} />
    <Route path="/flights/add" element={<FlightForm />} />
    <Route path="/flights/edit/:id" element={<FlightForm />} />
  </Routes>
);

export default AppRoutes;
