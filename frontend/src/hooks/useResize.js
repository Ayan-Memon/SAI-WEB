import React, { useEffect, useState } from "react";

const useResize = () => {
  const [resize, setResize] = useState({
    width: 0,
    height: 0,
  });
  const handleResize = () => {
    setResize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resize]);

  return resize;
};

export default useResize;
