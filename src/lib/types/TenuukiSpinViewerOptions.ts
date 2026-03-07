export interface TenuukiSpinViewerOptions {
  images: ReadonlyArray<string>;

  direction?: 1 | -1; // default: 1
  initialSpin?: boolean;
  spinOffset?: number; // degrees to offset the initial spin by. Defaults to 0.
  
  draggable?: boolean;
  // autoplay?: boolean;
  // inverse?: boolean;

  // 1-based index of the image to start on. Defaults to 1.
  initialFrame?: number;
}
