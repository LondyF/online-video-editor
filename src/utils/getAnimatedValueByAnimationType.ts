import { interpolate, spring } from "remotion";

export type AnimationTypes = "spring" | "interpolate";

type SpringConfig = Parameters<typeof spring>[0];

// type TupleToObject<T extends Array<{ type: string; value: any }>> = {
//   [K in T[number] as K["type"]]: K["value"];
// };

// type TupleToObject<Type extends readonly any[]> = {
//   [Key in Type[number]]: Key;
// };

type InterpolateConfig = Parameters<typeof interpolate>;

// const hey: InterpolateConfig = [2, [2], [1]];

// type A = TupleToObject<InterpolateConfig>;

export function getAnimatedValueByAnimationType<T extends AnimationTypes>(
  type: T,
  config: T extends "spring" ? SpringConfig : InterpolateConfig
): number {
  if (type === "spring") {
    return spring(config as SpringConfig);
  }

  return 0;
}
