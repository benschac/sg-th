import { View as MotiView } from "moti";
import React from "react";
import { Image } from "react-native";

export const AnimatedAnt: React.FC<{ duration: number; delay: number }> = (
  props
) => {
  const { duration, delay } = props;

  return (
    <MotiView
      from={{
        translateX: -260,
      }}
      animate={{
        translateX: 375,
      }}
      transition={{
        loop: true,
        type: "timing",
        duration,
        delay,
        repeatReverse: false,
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          transform: [{ rotateY: "180deg" }],
        }}
        source={require("../assets/ant.png")}
      />
    </MotiView>
  );
};
