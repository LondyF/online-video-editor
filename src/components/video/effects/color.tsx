import React from "react";

import { interpolateColors, useCurrentFrame } from "remotion";

import { InjectedEffectProps, makeEffect } from "../../../utils/makeEffect";

const Color: React.FC<InjectedEffectProps> = ({
  children,
  from = 0,
  to = 1,
  playTimeInFrames,
}) => {
  const frame = useCurrentFrame();

  const color1 = interpolateColors(
    frame,
    [0, playTimeInFrames],
    [String(from), String(to)]
  );

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        color: "white",
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        background: `${color1}`,
      }}
    >
      {children}
    </div>
  );
};

export default makeEffect(Color);
