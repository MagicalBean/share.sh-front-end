import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import red from "@material-ui/core/colors/red";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Download from "./pages/Download";
import Admin from "./pages/Admin";
import Nav from "./pages/Nav";

const theme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: "#f8f8f8",
    },
    secondary: {
      main: red[700],
    },
    text: {
      secondary: "#FFFFFF",
    },
  },
});

const serverUrl = "http://192.168.56.1/";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <Nav />
        <BrowserRouter>
          <Switch>
            <Route exact path="/download/:id" serverUrl={serverUrl} component={Download}></Route>
            <Route exact path="/admin" serverUrl={serverUrl} component={Admin}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

export default App;
