import { Grommet } from "grommet";

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
    <Grommet theme={theme}>
      <DashboardLayout />
    </Grommet>
  );
}

export default App;
