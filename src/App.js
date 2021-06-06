import { Grommet } from "grommet";
import { BrowserRouter as Router } from "react-router-dom";

import DashboardLayout from "components/DashboardLayout";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Router>
      <Grommet theme={theme}>
        <DashboardLayout />
      </Grommet>
    </Router>
  );
}

export default App;
