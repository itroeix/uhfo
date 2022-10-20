import './Main.css';

import React, { useState } from "react";
/*
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div class="info">
                    <h2>IP info</h2>
                    <h5 class="data">{data.ip}</h5><br />
                    <h5 class="data">{data.city}, {data.region} ({data.region_code}), {data.country_name} ({data.country_code})</h5><br />
                    <h5 class="data">Lat: {data.latitude}, Long: {data.longitude}</h5>< br />
                    <h5 class="data">Postal: {data.postal}</h5><br />
                    <h5 class="data">{data.org}</h5> <br />
                    <h5 class="data">Timezone: {data.timezone}</h5>
                </div>
            )}
*/

const Main = () => {

    // All states
    const [showDarkText, setDarkText] = useState("Toggle Dark Mode")
    const changeDarkText = (text) => setDarkText(text);
    const [darkMode, setDarkMode] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [graph, setGraph] = React.useState([]);
    const [resolution, setResolution] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(true);
    // Set automatic dark or light mode in the page
    React.useEffect(() => {
        // Reads the localStorage to view if has the site-dark-mode enabled
        const json = localStorage.getItem("site-dark-mode");
        const currentMode = JSON.parse(json);
        if (currentMode) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    React.useEffect(() => {
        // Set the dark mode or light mode when the user clicks on the button
        if (darkMode) {
            // Turn on dark mode
            document.body.classList.add("dark");
            changeDarkText("Toggle Light Mode")
        } else {
            // Turn on light mode
            document.body.classList.remove("dark");
            changeDarkText("Toggle Dark Mode")
        }
        const json = JSON.stringify(darkMode);
        localStorage.setItem("site-dark-mode", json);
    }, [darkMode]);
    
    // Get IP info with a third-party API
    /*
    React.useEffect(() => {
        const url = `https://ipapi.co/json/`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => setData(error));
    }, []);
    */
    // Fetch loading
    React.useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }
        //console.log(data);
    }, [data]);

    // Get GPU info
    React.useEffect(() => {
        const gl = document.createElement('canvas').getContext('webgl');
        if (!gl) {
            return {
                error: "no webgl",
            };
        }
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        // Get the vendor
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        // Get the GPU
        const render = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        // Get the resolutions
        const resolution = `${window.screen.width} x ${window.screen.height}`
        setGraph(render)
        setResolution(resolution)
    }, []);
    return (
        <div>
            <div>
                <h2>Settings</h2>
            </div>
            <div>
                <button onClick={() => setDarkMode(!darkMode)}>{showDarkText}</button>
            </div>





            <h2>Components</h2>
            <h5>{graph}</h5>
            <h5>{resolution}</h5>
        </div >
    );
}
export default Main;