import { TextGroupProperties, initialTextGroupState } from "../constants";
import Panda from "./panda.png";
import Morning from "./morning.jpeg";

export interface Example {
  label: string;
  texts: TextGroupProperties[];
  orientation: "landscape" | "portrait";
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  image?: {
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const letterExamples: Example[] = [
  {
    label: "פנדה",
    orientation: "portrait",
    margins: {
      top: 0.75,
      bottom: 0.75,
      left: 0.75,
      right: 0.75,
    },
    texts: Array.from({ length: 6 }).map((_, i) => {
      const defaults = initialTextGroupState();
      const group: TextGroupProperties = {
        ...defaults,
        text: i ? "פנדה" : "פ",
        font: {
          ...defaults.font,
          size: 100,
          lineHeight: 120,
        },
      };
      if (i === 0) {
        group.font.size = group.font.lineHeight = 300;
        group.grid.opacity = 0;
      }
      if (i === 0 || i === 1) group.font.family = "Cousine Regular";

      return group;
    }),
    image: {
      url: Panda,
      x: 70,
      y: -30,
      width: 220 * 1.2,
      height: 300 * 1.2,
    },
  },
];

export const sentenceExamples: Example[] = [
  {
    label: "מודה אני",
    orientation: "landscape",
    margins: {
      top: 5.2,
      bottom: 0.75,
      left: 0.75,
      right: 0.75,
    },
    texts: Array.from({ length: 4 }).map((_, i) => {
      const defaults = initialTextGroupState();
      const group: TextGroupProperties = {
        ...defaults,
        text: "מוֹדֶה אֲנִי לְפָנֶיךָ מֶלֶךְ חַי וְקַים",
        font: {
          ...defaults.font,
          size: 55,
          lineHeight: 120,
        },
      };

      if (i === 0) {
        group.grid.opacity = 0;
        group.font.size = 79;
        group.font.family = "Times New Roman Bubble";
      }

      return group;
    }),
    image: {
      url: Morning,
      x: 280,
      y: -290,
      width: 520,
      height: 300,
    },
  },
];
