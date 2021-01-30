import MainTemplate from "../../templates/MainTemplate";
import Home from "../Home/Home";
import Posts from "../Posts/Posts";
import MyAccount from "../MyAccount/MyAccount";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AddFriends from "../AddFriends/AddFriends";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "../../store";
import { routes } from "../../routes";

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <PrivateRoute path={routes.posts} component={Posts} />
            <PrivateRoute path={routes.account} component={MyAccount} />
            <PrivateRoute path={routes.friends} component={AddFriends} />
            <Route path={routes.login} component={Login} />
            <Route path={routes.register} component={Register} />
          </Switch>
        </MainTemplate>
      </Router>
    </Provider>
  );
}

export default Root;
