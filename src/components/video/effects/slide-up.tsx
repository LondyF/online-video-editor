import React from "react";

import { useCurrentFrame } from "remotion";
import { getAnimatedValueByAnimationType } from "../../../utils/getAnimatedValueByAnimationType";

import { InjectedEffectProps, makeEffect } from "../../../utils/makeEffect";

const SlideUp: React.FC<InjectedEffectProps> = ({
  children,
  from = 0,
  to = 100,
  playTimeInFrames,
  fps,
}) => {
  const frame = useCurrentFrame();

  const slideUp = React.useMemo(() => {
    return getAnimatedValueByAnimationType("spring", {
      frame,
      fps,
      from: Number(from),
      to: Number(to),
      durationInFrames: playTimeInFrames,
    });
  }, [fps, frame, from, playTimeInFrames, to]);

  return <div style={{ transform: `translateY(${slideUp}%)` }}>{children}</div>;
};

export default makeEffect(SlideUp);
