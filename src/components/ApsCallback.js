import React from 'react';
import useApsAuth from '../hooks/useApsAuth';
import Viewer from './viewer/Viewer';
import { Fragment, useRef } from "react";

const { REACT_APP_APS_URN } = process.env;

const ApsCallback = () => {
    const apsAuth = useApsAuth('code')

    const viewerRef = useRef();

    const onModelError = (error) => {
        console.error(error);
    };

    const onModelLoaded = (viewer) => {
        console.log("%cModel loaded Successfully!", "color: #c92a2a");
        console.log("Time Taken", new Date() - window.time);
    };
    if (apsAuth.isTokenSet) {
        return (<Fragment>
            <div style={{ position: "absolute", width: "100%", height: "100%" }} ref={viewerRef} />
            <Viewer
                viewerRef={viewerRef}
                urn={REACT_APP_APS_URN}
                modelGuid=""
                extensions={[]}
                onModelLoaded={onModelLoaded}
                onModelError={onModelError}
            />
        </Fragment>)

    } else {
        return (
            <div>
                loading
            </div>
        );
    }

}

export default ApsCallback;
