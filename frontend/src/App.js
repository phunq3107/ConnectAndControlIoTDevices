
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './services/authorization/AuthContext';
import { useContext, useEffect } from 'react';
import {
  AdminHome,
  EmployeeManage,
  EmployeeCreateForm,
  EmployeeInfo,
  EmployeeLog,
  EmployeeHome,
  Incubator,
  ErrorPage,
  Login
} from './pages';

function App() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    const user = auth.getCurrentUser()
    if (!(user && user.access_token)) {
      navigate('/login')
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/employees" element={<EmployeeManage />} />
        <Route path="/admin/create-form" element={<EmployeeCreateForm />} />
        <Route path="/employee" element={<EmployeeHome />} />
        <Route path="/employee/info" element={<EmployeeInfo />} />
        <Route path="employee/log" element={<EmployeeLog />} />
        <Route path="/incubator" element={<Incubator />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
