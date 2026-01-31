import { CSSProperties } from "react";

interface GradientOptions {
  type?: "simple" | "complex";
  opacity?: number;
}

type ColorPaletteKey =
  | "default"
  | "warmColors"
  | "coolColors"
  | "pastels"
  | "vibrant"
  | "neons"
  | "sunset";

/**
 * Generates a random gradient css style.
 *
 * Options:
 *   - type: The type of gradient, simple or complex.
 *   - opacity: The opacity of the gradient.
 *
 * The function returns a CSSProperties object with the background property set to a random gradient.
 * The gradient is generated using the color palettes defined in the colorPalettes object.
 * The type of gradient is randomly selected from the options.simple and options.complex.
 * The opacity is randomly selected from the range [0, 1].
 *
 * @example
 * const gradient1 = randomGradientGenerator();
 * const gradient2 = randomGradientGenerator({ type: "complex", opacity: 0.5 });
 * const Comp = () => (
 *   <div>
 *     <div style={gradient1}>Random gradient 1</div>
 *     <div style={gradient2}>Random gradient 2</div>
 *   </div>
 * );
 *
 * @param {GradientOptions} [options={}] The options object.
 * @returns {CSSProperties} The CSSProperties object with the background property set to a random gradient.
 */

export function randomGradientGenerator({
  type = "simple",
  opacity = 1,
}: GradientOptions = {}): CSSProperties {
  const colorPalettes: Record<ColorPaletteKey, string[]> = {
    default: [
      "#4EB5FF",
      "#4C00FC",
      "#6DFFAE",
      "#8A4FFF",
      "#73F2FF",
      "#CEFAFF",
      "#D3FF6D",
      "#FF6B6B",
      "#00CEC9",
    ],
    warmColors: ["#FF6B6B", "#FFB88C", "#FFA07A", "#FF9A8B", "#FFAE8F"],
    coolColors: ["#4ECDC4", "#6C5CE7", "#45B7D1", "#A6C1EE", "#88D3CE"],
    pastels: ["#E2F0CB", "#FFE5E5", "#E0F4FF", "#FFF1E6", "#F0E6FF"],
    vibrant: ["#00B894", "#0984E3", "#6C5CE7", "#00CEC9", "#FFC312"],
    neons: ["#73F2FF", "#8A4FFF", "#6DFFAE", "#4EB5FF", "#CEFAFF"],
    sunset: ["#FF7B54", "#FFB26B", "#FFD56F", "#939B62", "#FF4D4D"],
  };

  const applyOpacity = (color: string, opacity: number) => {
    if (opacity === 1) return color;
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${alpha}`;
  };

  const getRandomColor = (preferredPalette?: ColorPaletteKey) => {
    const palette = preferredPalette
      ? colorPalettes[preferredPalette]
      : colorPalettes[
          Object.keys(colorPalettes)[
            Math.floor(Math.random() * Object.keys(colorPalettes).length)
          ] as ColorPaletteKey
        ];
    return applyOpacity(
      palette[Math.floor(Math.random() * palette.length)],
      opacity,
    );
  };

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    return `${x}% ${y}%`;
  };

  const getRandomSize = () => {
    const minSize = 30;
    const maxSize = 60;
    const width = Math.floor(Math.random() * (maxSize - minSize) + minSize);
    const height = Math.floor(Math.random() * (maxSize - minSize) + minSize);
    return `${width}% ${height}%`;
  };

  if (type === "complex") {
    const numberOfLayers = Math.floor(Math.random() * 3) + 4; // 4-6 capas
    const gradientLayers = [];

    for (let i = 0; i < numberOfLayers - 1; i++) {
      const size = getRandomSize();
      const position = getRandomPosition();
      const color = getRandomColor();
      const fadeOutPoint = Math.floor(Math.random() * 15) + 23;
      gradientLayers.push(
        `radial-gradient(${size} at ${position}, ${color} ${fadeOutPoint}%, transparent 100%)`,
      );
    }

    const angle = Math.floor(Math.random() * 360);
    gradientLayers.push(
      `linear-gradient(${angle}deg, ${getRandomColor(
        "default",
      )} 1%, ${getRandomColor("default")} 100%)`,
    );

    return {
      backgroundSize: "100% 100%",
      backgroundPosition: Array(numberOfLayers).fill("0px 0px").join(","),
      backgroundImage: gradientLayers.join(","),
      backgroundRepeat: "no-repeat",
    };
  } else {
    const gradientTypes = ["linear", "radial", "conic"];
    const randomGradientType =
      gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
    const randomAngle = Math.floor(Math.random() * 360);
    const colors = [
      getRandomColor("default"),
      getRandomColor("default"),
      getRandomColor("default"),
    ];

    switch (randomGradientType) {
      case "linear":
        return {
          background: `linear-gradient(${randomAngle}deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        };
      case "radial":
        return {
          background: `radial-gradient(circle at ${getRandomPosition()}, ${
            colors[0]
          }, ${colors[1]}, ${colors[2]})`,
        };
      case "conic":
        return {
          background: `conic-gradient(from ${randomAngle}deg at ${getRandomPosition()}, ${
            colors[0]
          }, ${colors[1]}, ${colors[2]})`,
        };
      default:
        return {
          background: `linear-gradient(${randomAngle}deg, ${colors[0]}, ${colors[1]})`,
        };
    }
  }
}
