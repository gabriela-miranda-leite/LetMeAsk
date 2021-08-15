import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/rooms/new">
          <NewRoom />
        </Route>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
