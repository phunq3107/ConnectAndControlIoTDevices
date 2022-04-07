
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import { Routes, Route, useNavigate} from 'react-router-dom'
import ErrorPage from './ErrorPage';
import Incubator from './pages/Incubator/Incubator';
import EmployeeHome from './pages/EmployeeHome/EmployeeHome';
import { AuthContext } from './services/authorization/AuthContext';
import { useContext,useEffect } from 'react';
import AdminHome from './pages/AdminHome/AdminHome';
import EmployeeManage from './pages/EmployeeManage/EmployeeManage';
import EmployeeCreateForm from './pages/EmployeeManage/EmployeeCreateForm';
function App() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    const user = auth.getCurrentUser()
    if (!(user && user.access_token)){
      navigate('/login')
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/employees" element={<EmployeeManage />} />
        <Route path="/admin/create-form" element={<EmployeeCreateForm />} />
        <Route path="/employee" element={<EmployeeHome />} />
        <Route path="/incubator" element={<Incubator />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
