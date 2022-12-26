import "./Style.css"
import { CssBaseline, Dialog } from "@mui/material";
import Table from "./components/Table";
import Form from "./components/Form";

import { useState } from "react";

function App() {

  const[data, setData] = useState([]); // state for table data
  const[dialogOpen, setDialogOpen] = useState(false);

  const[defaultData, setDefaultData] = useState([]);

  return (
  <div className="App">
    <CssBaseline />

    <Table data={data} setData={setData} setDialogOpen={setDialogOpen} setDefaultData={setDefaultData} />

    <Dialog
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    fullWidth
    maxWidth="lg">
      <Form data={data} setData={setData} setDialogOpen={setDialogOpen} defaultData={defaultData} />
    </Dialog>
  </div>
  )
}

export default App;
