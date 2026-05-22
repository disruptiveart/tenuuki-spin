export interface TenuukiSpinViewerOptions {
  images: ReadonlyArray<string>;
  axis?: 'x' | 'y'; // default: 'x'
  direction?: 1 | -1; // default: 1
  initialSpin?: boolean;
  initialSpinDirection?: 1 | -1; // default: 1
  spinOffset?: number; // degrees to offset the initial spin by. Defaults to 0.
  
  draggable?: boolean;
  // autoplay?: boolean;
  // inverse?: boolean;

  // 1-based index of the image to start on. Defaults to 1.
  initialFrame?: number;
  frameInterval?: number; // milliseconds between frames. Defaults to 60.
  speedMultiplier?: number; // >1 faster, <1 slower. Defaults to 1.
  rotationCurve?: 'linear' | 'standard' | 'easeInOutQuad'; // Defaults to linear.
  replacementToken?: string; // default: 'frame'
}
