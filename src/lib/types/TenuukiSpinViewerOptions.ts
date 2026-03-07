export interface TenuukiSpinViewerOptions {
  images: ReadonlyArray<string>;

  initialSpin?: boolean;
  spinOffset?: number; // degrees to offset the initial spin by. Defaults to 0.
  
  // TODO:
  // draggable?: boolean;
  // autoplay?: boolean;
  // inverse?: boolean;

  // 1-based index of the image to start on. Defaults to 1.
  initialFrame?: number;
}
