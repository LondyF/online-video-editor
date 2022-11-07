import React from "react";
import { useVideoConfig } from "remotion";

type StandardEffectProps = {
  children: React.ReactNode;
  to?: string | number;
  from?: string | number;
  duration?: string | number;
};

type InjectedProps = {
  playTimeInFrames: number;
  durationInSeconds: number;
  fps: number;
};

export type InjectedEffectProps = StandardEffectProps & InjectedProps;

const MS_IN_SECOND = 1000;

export const makeEffect = <P extends InjectedEffectProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof InjectedProps>> => {
  // eslint-disable-next-line react/display-name
  return (props: StandardEffectProps) => {
    const { duration } = props;
    const { fps, durationInFrames } = useVideoConfig();

    const durationInSeconds = duration ? Number(duration) / MS_IN_SECOND : 0;
    const playTimeInFrames = durationInSeconds * fps || durationInFrames;

    return (
      <Component
        {...(props as P)}
        fps={fps}
        durationInSeconds={durationInSeconds}
        playTimeInFrames={playTimeInFrames}
      />
    );
  };
};
