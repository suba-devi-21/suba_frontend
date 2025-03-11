import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./assets/Components/Login";
import Signin from "./assets/Components/Signin";
import Home from "./assets/Components/Home";
import Mainpage from "./assets/Components/Mainpage";
import Myposts from "./assets/Components/Myposts";
import { AuthProvider } from "./assets/ContextAPI/AuthContext";
import { Container, Row } from "react-bootstrap";
import Navbarc from "./assets/Components/Navbarc";
import Createposts from "./assets/Components/Createposts";
import EditPost from "./assets/Components/Editposts";
import People from "./assets/Components/People";

function App() {
  const location  = useLocation();
  return (
    <>
      
      <AuthProvider>
        <Container>
          <Row>
          {location.pathname !== "/"&&location.pathname !== "/login" && location.pathname !== "/signin" && <Navbarc />}
          </Row>
          <Row>
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Mainpage />} />
          <Route path='/myposts' element ={<Myposts />} />
          <Route path='/createpost' element = {<Createposts />} /> 
          <Route path='/editpost/:id' element = {<EditPost />} />  
          <Route path='/people' element={<People />} />
        </Routes>
          </Row>
        </Container>
        </AuthProvider>
      
    </>
  );
}

export default App;
