import './App.css';
import Routes from "./routes/routes";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import LogIn from "./pages/login";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          exact={true}
          name="Login"
          component={LogIn}
        />
        {Routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={(props) =>
                JSON.parse(localStorage.getItem("bugtester_auth"))?.token || false ? (
                  <>
                    <Header />
                    <route.component {...props} />
                  </>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
