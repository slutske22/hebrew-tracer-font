import { v4 as uuid } from "uuid";

/**
 * The shape of a single text item group
 */
export interface TextGroupProperties {
  /**
   * Unique ID for the text group
   */
  id: string;
  /**
   * The text itself
   */
  text: string;
  /**
   * Details of the font for this group
   */
  font: {
    size: number;
    family: string;
  };
  /**
   * Details for the grid for this group
   */
  grid: {
    top: boolean;
    middle: boolean;
    bottom: boolean;
    opacity: number;
  };
}

/**
 * Function to generate a default initial state for a text group
 */
export const initialTextGroupState = (): TextGroupProperties => ({
  id: uuid(),
  text: "",
  font: {
    size: 60,
    family: "",
  },
  grid: {
    top: true,
    middle: true,
    bottom: true,
    opacity: 1,
  },
});

/**
 * Different fonts a user can use
 */
export const fontOptions = ["Cousine Regular", "Cousine Tracer"];
