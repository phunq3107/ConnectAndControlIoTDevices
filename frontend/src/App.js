
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import { Routes, Route, useNavigate} from 'react-router-dom'
import ErrorPage from './ErrorPage';
import Incubator from './pages/Incubator/Incubator';
import EmployeeHome from './pages/Incubator/EmployeeHome/EmployeeHome';
import { AuthContext } from './AuthContext';
import { useContext,useEffect } from 'react';
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
        <Route path="/employee" element={<EmployeeHome />} />
        <Route path="/incubator" element={<Incubator />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
