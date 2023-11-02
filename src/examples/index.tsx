import { TextGroupProperties, initialTextGroupState } from "../constants";

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
      const group: TextGroupProperties = {
        ...initialTextGroupState(),
        text: i ? "פנדה" : "פ",
      };
      if (i === 0) {
        group.font.size = group.font.lineHeight = 300;
        group.grid.opacity = 0;
      }
      if (i === 0 || i === 1) group.font.family = "Cousine Regular";

      return group;
    }),
  },
];
