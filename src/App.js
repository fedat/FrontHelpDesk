import './App.css';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { AuthProvider } from './contexto/Auth';
import React from 'react';

import Login from './Pages/Login/LoginAdmin';
import Admin from './Pages/Admin/RequestModule/Admin';
import Details from './Pages/Admin/RequestModule/Details';
import { Historial } from './Pages/Admin/RequestModule/Historial';
import { ChildRequest } from './Pages/Admin/RequestModule/ChildRequest';
import SurveyDetail from './Pages/Admin/RequestModule/SurveyDetail';
import Charts from './Pages/SuperAdmin/Chart/ChartsReq';
import Survey from './Pages/SuperAdmin/Chart/ChartsSurvey';

import ActiveUsers from './Pages/SuperAdmin/UsersModule/ActiveUsers';
import InactiveUsers from './Pages/SuperAdmin/UsersModule/InactiveUsers';
import EditUser from './Pages/SuperAdmin/UsersModule/EditUser';
import CreateUser from './Pages/SuperAdmin/UsersModule/createUser';
import ChartsSuper from './Pages/SuperAdmin/Chart/ChartsAdmin';
import Request from './Pages/SuperAdmin/RequestModule/Request';
import Surveys from './Pages/SuperAdmin/RequestModule/Surveys';

import NotFound from './Pages/NotFound/NotFound';
import SatisfactionSurvey from './Pages/User/SatisfactionSurvey';
import UserIndex from './Pages/User';
import RequestsUser from './Pages/User/RequestsUser';
import ChangePassword from './Pages/SuperAdmin/UsersModule/ChangePassword';
import ChartsByAdmin from './Pages/Admin/Chart/Charts';
import SurveyByAdmin from './Pages/Admin/Chart/Survey';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<NotFound/>} />
            <Route path="/" element={<Login/>} />
          //user
            < Route path="/user-request" element={<UserIndex />} />
            < Route path="/user-survey/:id" element={<SatisfactionSurvey />} />
          < Route path="/user-requests" element={<RequestsUser />} />
            //admin
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:param" element={<Admin />} />
            <Route path="/request-details/:id" element={<Details />} />
            <Route path="/request-childs/:id" element={<ChildRequest />} />
            <Route path="/request-historial/:id" element={<Historial />} />
            <Route path="/admin-chart-request" element={<ChartsByAdmin />} />
            <Route path="/admin-chart-survey" element={<SurveyByAdmin />} />
          //superadmin
            <Route path="/super" element={<ActiveUsers />} />
            <Route path="/super/inactive" element={<InactiveUsers />} />
            <Route path="/super-editUser/:id" element={<EditUser />} />
            <Route path="/super-createUser" element={<CreateUser />} />
            <Route path="/charts-super" element={<ChartsSuper />} />
            <Route path="/chart-request" element={<Charts />} />
            <Route path="/chart-survey" element={<Survey />} />
            <Route path="/requests" element={<Request />} />
            <Route path="/requests/:param" element={<Request />} />
            <Route path="/survey-details/:id" element={<SurveyDetail />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/password" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
