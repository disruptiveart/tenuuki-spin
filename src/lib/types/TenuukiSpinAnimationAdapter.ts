import BezierEasing from 'bezier-easing'

export interface TenuukiSpinAnimationRequest {
  totalSteps: number;
  cycleLength: number;
  frameIntervalMs: number;
  totalFrames: number;
  easing: string;
  onUpdate: (stepDelta: number) => void;
  onComplete?: () => void;
}

export interface TenuukiSpinAnimationAdapter {
  start(request: TenuukiSpinAnimationRequest): () => void;
}

const CSS_BEZIER_PRESETS: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
}

const parseBezierEasing = (value: string) => {
  const preset = CSS_BEZIER_PRESETS[value]
  if (preset) {
    return BezierEasing(...preset)
  }

  const match = value.match(/^cubic-bezier\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)$/i)
  if (!match) return null

  const x1 = Number(match[1])
  const y1 = Number(match[2])
  const x2 = Number(match[3])
  const y2 = Number(match[4])
  if (!Number.isFinite(x1) || !Number.isFinite(y1) || !Number.isFinite(x2) || !Number.isFinite(y2)) {
    return null
  }

  try {
    return BezierEasing(x1, y1, x2, y2)
  } catch {
    return null
  }
}

const easeOutBounce = (t: number) => {
  const n1 = 7.5625
  const d1 = 2.75

  if (t < 1 / d1) return n1 * t * t
  if (t < 2 / d1) {
    const x = t - 1.5 / d1
    return n1 * x * x + 0.75
  }
  if (t < 2.5 / d1) {
    const x = t - 2.25 / d1
    return n1 * x * x + 0.9375
  }

  const x = t - 2.625 / d1
  return n1 * x * x + 0.984375
}

const EASINGS_NET_CURVES: Record<string, (t: number) => number> = {
  linear: (t: number) => t,
  easeinquad: (t: number) => t * t,
  easeoutquad: (t: number) => 1 - Math.pow(1 - t, 2),
  easeinoutquad: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeincubic: (t: number) => t * t * t,
  easeoutcubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeinoutcubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeinquart: (t: number) => t * t * t * t,
  easeoutquart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeinoutquart: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  easeinquint: (t: number) => t * t * t * t * t,
  easeoutquint: (t: number) => 1 - Math.pow(1 - t, 5),
  easeinoutquint: (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
  easeinsine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeoutsine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeinoutsine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeinexpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeoutexpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeinoutexpo: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2
  },
  easeincirc: (t: number) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
  easeoutcirc: (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)),
  easeinoutcirc: (t: number) => {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  },
  easeinback: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  easeoutback: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeinoutback: (t: number) => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2
  },
  easeinelastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    if (t === 0) return 0
    if (t === 1) return 1
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  easeoutelastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3
    if (t === 0) return 0
    if (t === 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  easeinoutelastic: (t: number) => {
    const c5 = (2 * Math.PI) / 4.5
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
  },
  easeinbounce: (t: number) => 1 - easeOutBounce(1 - t),
  easeoutbounce: easeOutBounce,
  easeinoutbounce: (t: number) => {
    return t < 0.5
      ? (1 - easeOutBounce(1 - 2 * t)) / 2
      : (1 + easeOutBounce(2 * t - 1)) / 2
  }
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

const getNormalizedCurveName = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]/g, '')

const getRotationCurveFor = (value: string) => {
  const rawCurve = value.trim()
  const bezierCurve = parseBezierEasing(rawCurve.toLowerCase())
  if (bezierCurve) return bezierCurve
  if (rawCurve.toLowerCase() === 'standard') return (t: number) => t * t * (3 - 2 * t)
  return EASINGS_NET_CURVES[getNormalizedCurveName(rawCurve)] ?? ((t: number) => t)
}

const getEasedSteps = (linearSteps: number, request: TenuukiSpinAnimationRequest) => {
  const curve = getRotationCurveFor(request.easing)
  const cycleLength = Math.max(1, request.cycleLength)
  const completeCycles = Math.floor(linearSteps / cycleLength)
  const progress = (linearSteps - completeCycles * cycleLength) / cycleLength
  return completeCycles * cycleLength + clamp01(curve(clamp01(progress))) * cycleLength
}

const getMaxStepDelta = (easing: string, totalFrames: number) => {
  const normalized = getNormalizedCurveName(easing)
  const baseCap = Math.max(1, Math.ceil(totalFrames / 24))
  if (normalized.includes('bounce')) return Math.min(2, baseCap)
  if (normalized.includes('elastic')) return Math.min(3, Math.max(2, baseCap))
  return Math.max(4, baseCap)
}

export const defaultTenuukiSpinAnimationAdapter: TenuukiSpinAnimationAdapter = {
  start(request) {
    let frameId: number | undefined
    let running = true
    let appliedSteps = 0
    const startedAt = performance.now()
    const isInfinite = !Number.isFinite(request.totalSteps)
    const maxStepDelta = getMaxStepDelta(request.easing, request.totalFrames)

    const tick = (time: number) => {
      if (!running) return
      const linearSteps = Math.max(0, time - startedAt) / request.frameIntervalMs
      const finiteLinearSteps = isInfinite ? linearSteps : Math.min(request.totalSteps, linearSteps)
      const targetSteps = Math.floor(isInfinite
        ? getEasedSteps(finiteLinearSteps, request)
        : request.cycleLength >= request.totalSteps
          ? clamp01(getRotationCurveFor(request.easing)(clamp01(finiteLinearSteps / request.totalSteps))) * request.totalSteps
          : Math.min(request.totalSteps, getEasedSteps(finiteLinearSteps, request)))
      const stepDelta = targetSteps - appliedSteps
      if (stepDelta > 0) {
        const appliedDelta = Math.min(stepDelta, maxStepDelta)
        request.onUpdate(appliedDelta)
        appliedSteps += appliedDelta
      }
      if (!isInfinite && appliedSteps >= request.totalSteps) {
        running = false
        request.onComplete?.()
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => {
      running = false
      if (frameId !== undefined) cancelAnimationFrame(frameId)
      frameId = undefined
    }
  }
}
