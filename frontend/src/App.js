import { Route, Routes, Navigate ,BrowserRouter} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/register";
import Home from "./components/home/Main";
import QuestionForm from "./components/questionForm"
import Register from "./components/register"
import Plans from "./components/plans"
import Main from "./components/home/Main";
import AddressForm from "./components/home/AdressForm";

import './App.css';


function App() {

  return (
    <>
    <BrowserRouter>

    <Routes>
      
			<Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/home" exact element={<Home/>}/>
      <Route path="/question" exact element={<QuestionForm/>}/>
      <Route path="/register" exact element={<Register/>}/>
      <Route path="/plans" exact element={<Plans/>}/>
      
		</Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
