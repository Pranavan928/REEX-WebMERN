import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Grid } from "@material-ui/core";
import Content from "./Content";

function App() {
  AOS.init();
  return (
    <div>
      <Grid >
        <div data-aos="zoom-in">
          <Content />
        </div>
      </Grid>
    </div>
  );
}
export default App;