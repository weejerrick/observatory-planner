import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import DSOList from "./components/DSOList";
import SideNav from "./components/SideNav";
import Schedule from "./pages/Schedule";
import Exoplanets from "./pages/Exoplanets";
import EclipsingBinaries from "./pages/EclipsingBinaries";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [observatoryPosition, setObservatoryPosition] = useState({
    date: new Date().toISOString().slice(0, 10),
    longitude: "33.5573234",
    latitude: "-117.7362203",
  });
  const [objList, setObjList] = useState({ state: "loading" });

  const theme = createTheme({
    palette: {
      type: darkMode === true ? "dark" : "light",
      primary: { main: darkMode === true ? "#90a4ae" : "#455a64" },
    },
    typography: {
      fontFamily: "Quicksand",
      h1: {
        fontSize: 30,
        fontWeight: 500,
      },
    },
  });

  useEffect(() => {
    const fetchDSO = async () => {
      const res = await fetch("https://obsplanner.herokuapp.com/dso", {
        method: "POST",
        body: JSON.stringify(observatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      setObjList(data);
    };
    fetchDSO();
    // eslint-disable-next-line
  }, []);

  const positionUpdate = (newObservatoryPosition) => {
    const refetchDSO = async () => {
      const res = await fetch("https://obsplanner.herokuapp.com/dso", {
        method: "POST",
        body: JSON.stringify(newObservatoryPosition),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      setObjList(data);
    };
    refetchDSO();
  };

  const locationSelection = (locationData) => {
    const newObservatoryPosition = {
      ...observatoryPosition,
      ...locationData,
    };
    setObservatoryPosition({ ...observatoryPosition, ...locationData });
    console.log("new position settings", {
      ...observatoryPosition,
      ...locationData,
    });
    positionUpdate(newObservatoryPosition);
    setObjList({ state: "loading" });
  };

  const dateSelection = (dateData) => {
    const newObservatoryPosition = {
      ...observatoryPosition,
      ...dateData,
    };
    setObservatoryPosition({ ...observatoryPosition, date: dateData });
    console.log("new position settings", {
      ...observatoryPosition,
      date: dateData,
    });
    positionUpdate(newObservatoryPosition);
    setObjList({ state: "loading" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SideNav
        darkMode={darkMode}
        selectMode={(mode) => setDarkMode(mode)}
        locationSelection={locationSelection}
        dateSelection={dateSelection}
      >
        <Switch>
          <Route exact path="/">
            <DSOList objList={objList} />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/exoplanets">
            <Exoplanets />
          </Route>
          <Route path="/eclipsingbinaries">
            <EclipsingBinaries />
          </Route>
        </Switch>
      </SideNav>
    </ThemeProvider>
  );
}

export default App;
