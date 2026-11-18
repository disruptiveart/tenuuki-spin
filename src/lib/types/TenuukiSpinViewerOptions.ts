export interface TenuukiSpinViewerFrameChangePayload {
  image_name: string;
  index: number;
  angle: number;
  id?: string;
  ref?: HTMLElement;
}

export interface TenuukiSpinViewerOptions {
  images: ReadonlyArray<string>;
  axis?: 'x' | 'y'; // default: 'x'
  direction?: 1 | -1; // default: 1
  initialSpin?: boolean;
  initialSpinDirection?: 1 | -1; // defaults to direction when omitted.
  spinOffset?: number; // degrees to offset the initial spin by. Defaults to 0.
  
  draggable?: boolean;
  showArrows?: boolean;
  showRotationHints?: boolean;
  // autoplay?: boolean;
  // inverse?: boolean;

  // 1-based index of the image to start on. Defaults to 1.
  initialFrame?: number;
  frameInterval?: number; // milliseconds between frames. Defaults to 60.
  speedMultiplier?: number; // >1 faster, <1 slower. Defaults to 1.
  rotationCurve?: string; // easings.net names, CSS presets (ease/ease-in/ease-out/ease-in-out), or cubic-bezier(...)
  easingScope?: 'single' | 'full'; // single: per 360deg cycle, full: entire spin duration.
  onFrameChange?: (payload: TenuukiSpinViewerFrameChangePayload) => void;
  replacementToken?: string; // default: 'frame'
}
