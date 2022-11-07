import React, { Children, cloneElement } from "react";

import { useCurrentFrame } from "remotion";
import { getAnimatedValueByAnimationType } from "../../../utils/getAnimatedValueByAnimationType";

import { InjectedEffectProps, makeEffect } from "../../../utils/makeEffect";

type Props = {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
};

const Position: React.FC<InjectedEffectProps & Props> = ({
  children,
  playTimeInFrames,
  fps,
  startX,
  startY,
  endX,
  endY,
}) => {
  const frame = useCurrentFrame();
  const childrenRef = React.useRef([]);

  const arrayChildren = Children.toArray(children);

  // if != X -> Center op X
  // left: 50% - translateX(-50%)
  // if != Y -> Center op Y
  // top: 50% - translateY(-50%)

  const fade = React.useMemo(() => {
    return getAnimatedValueByAnimationType("spring", {
      frame,
      fps,
      from: Number(0),
      to: Number(0),
      durationInFrames: playTimeInFrames,
      config: {
        overshootClamping: true,
        damping: 200,
      },
    });
  }, [fps, frame, playTimeInFrames]);

  //   console.log(childrenRef);

  return (
    <div>
      {Children.map(arrayChildren, (child, index) => {
        if (React.isValidElement(child)) {
          //   console.log(child.type.name);
          return (
            <>
              {React.cloneElement(child, {
                ...child.props,
                ref: (ref) => {
                  console.log("HEY");
                  console.log("ref", ref);
                  //   childrenRef.current[index] = ref;
                },
              } as React.Attributes)}
            </>
          );
        }
      })}
    </div>
  );
};

export default makeEffect(Position);
