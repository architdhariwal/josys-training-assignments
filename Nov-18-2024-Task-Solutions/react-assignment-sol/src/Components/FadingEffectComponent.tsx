import React, { useLayoutEffect, useRef } from "react";

interface FadingEffectProps {
  children: React.ReactNode; 
  duration?: string; 
}

const FadingEffectComponent: React.FC<FadingEffectProps> = ({
  children,
  duration = "3s",
}) => {
  const fadeRef = useRef<HTMLDivElement>(null); 

  useLayoutEffect(() => {
    if (fadeRef.current) {
      fadeRef.current.style.transition = `opacity ${duration} ease-in-out`;
      fadeRef.current.style.opacity = "1";
    }
  }, [duration]);

  return (
    <div
      ref={fadeRef}
      style={{
        opacity: "0", 
      }}
    >
      {children}
    </div>
  );
};

export default FadingEffectComponent;
