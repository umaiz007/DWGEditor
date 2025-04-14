/* global Autodesk */

/* Uncomment the code which is commented to render model using two legged */
import { useState, useEffect, useRef } from 'react';
import './viewer.css';
import { initViewer, loadModel } from './ViewerFunction';
// import { getTwoLeggedAccessToken } from '../../utils/authentication/TwoLeggedAccessToken';

const Viewer = ({ viewerRef, urn, modelGuid, extensions = [], onModelLoaded, onModelError }) => {
    window.time = new Date();
    let apsToken = localStorage.getItem("apsToken");
    apsToken = JSON.parse(apsToken);

    const [isLoading, setIsLoading] = useState(true);
    const viewer = useRef(null);
    console.log(apsToken.access_token);

    useEffect(() => {
        const options = {
            api: 'streamingV2',
            env: 'AutodeskProduction2',
            accessToken: apsToken.access_token
            // getAccessToken: getTwoLeggedAccessToken
        };

        (async () => {
            try {
                viewer.current = await initViewer(viewerRef.current, options, extensions);
                await loadModel(viewer.current, urn, modelGuid);
                setIsLoading(false);

                viewer.current.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, async () => {
                    window.asp_viewer = viewer.current;

                    onModelLoaded(viewer.current);
                });
            } catch (e) {
                setIsLoading(false);
                onModelError(e);
            }
        })();

        return () => {
            if (viewer.current) {
                viewer.current.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT);
                viewer.current.finish();
                viewer.current = null;
                window.asp_viewer = null;
            }
        };
    }, [viewerRef, urn, modelGuid, extensions, onModelLoaded, onModelError]);

    if (isLoading) return <h2 className='loading'>Loading...</h2>;

    return null;
};

export default Viewer;