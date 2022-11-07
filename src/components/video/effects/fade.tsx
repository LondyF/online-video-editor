import React from "react";

import { useCurrentFrame } from "remotion";
import { getAnimatedValueByAnimationType } from "../../../utils/getAnimatedValueByAnimationType";

import { InjectedEffectProps, makeEffect } from "../../../utils/makeEffect";

const Fade: React.FC<InjectedEffectProps> = ({
  children,
  from = 0,
  to = 1,
  playTimeInFrames,
  fps,
}) => {
  const frame = useCurrentFrame();

  const fade = React.useMemo(() => {
    return getAnimatedValueByAnimationType("spring", {
      frame,
      fps,
      from: Number(from),
      to: Number(to),
      durationInFrames: playTimeInFrames,
      config: {
        overshootClamping: true,
        damping: 200,
      },
    });
  }, [fps, frame, from, playTimeInFrames, to]);

  return <div style={{ opacity: `${fade}` }}>{children}</div>;
};

export default makeEffect(Fade);
