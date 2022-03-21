
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import {Routes,Route} from 'react-router-dom'
import ErrorPage from './ErrorPage';
import Incubator from './components/Incubator/Incubator';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/Incubator" element ={<Incubator/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
