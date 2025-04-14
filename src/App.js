import { Fragment, useRef } from "react";
// import Viewer from './components/viewer/Viewer';
import Router from "./router/Router";
import { BrowserRouter } from 'react-router-dom';



// const { REACT_APP_APS_URN } = process.env;

function App() {
  const viewerRef = useRef();

  // const onModelError = (error) => {
  //   console.error(error);
  // };

  // const onModelLoaded = (viewer) => {
  //   console.log("%cModel loaded Successfully!", "color: #c92a2a");
  // };

  return (
    <Fragment>
      <div style={{ position: "absolute", width: "100%", height: "100%" }} ref={viewerRef} />
      <BrowserRouter>
        <Router />

      </BrowserRouter>
      {/* <Viewer
        viewerRef={viewerRef}
        urn={REACT_APP_APS_URN}
        modelGuid=""
        onModelLoaded={onModelLoaded}
        onModelError={onModelError}
      /> */}
    </Fragment>
  );
}

export default App;
