import React, { useState,useEffect } from "react";

const ScreenLoader = () => {
  const [showScreenOverlay, setShowScreenOverlay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
        setShowScreenOverlay(false)
    }, 1500);
  }, [])
  
  return <>{showScreenOverlay && <div className="fader"></div>}</>;
};

export default ScreenLoader;
