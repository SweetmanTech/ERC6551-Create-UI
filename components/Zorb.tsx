import { useMemo, useState } from 'react'
import { arrayify } from '@ethersproject/bytes'
import tinycolor, { ColorInput } from 'tinycolor2'

const linear = (p: number) => p

const cubicInOut = (p: number) => {
  var m = p - 1,
    t = p * 2
  if (t < 1) return p * t * t
  return 1 + m * m * m * 4
}

const cubicIn = (p: number) => {
  return p * p * p
}

const quintIn = (p: number) => {
  return p * p * p * p * p
}

const bscale = (byte: number, max: number) => Math.round((byte / 255) * max)

// Util for keeping hue range in 0-360 positive
const clampHue = (h: number) => {
  if (h >= 0) {
    return h % 360.0
  } else {
    return 360 + (h % 360)
  }
}

// scale byte in range min and max
const bScaleRange = (byte: number, min: number, max: number) => {
  return bscale(byte, max - min) + min
}

export const lerpHueFn = (optionNum: number, direction: number) => {
  const option = optionNum % 4
  const multiplier = direction ? 1 : -1
  switch (option) {
    case 0: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 10
        return clampHue(linear(1.0 - pct) * hue + linear(pct) * endHue)
      }
    }
    case 1: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 30
        return clampHue(linear(1.0 - pct) * hue + linear(pct) * endHue)
      }
    }
    case 2: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 50
        let lerpPercent = cubicInOut(pct)
        return clampHue(linear(1.0 - lerpPercent) * hue + lerpPercent * endHue)
      }
    }
    case 3:
    default: {
      return function (hue: number, pct: number) {
        let endHue = hue + multiplier * 60 * bscale(optionNum, 1.0) + 30
        let lerpPercent = cubicInOut(pct)
        return clampHue((1.0 - lerpPercent) * hue + lerpPercent * endHue)
      }
    }
  }
}

const lerpLightnessFn = (optionNum: number) => {
  switch (optionNum) {
    case 0: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = quintIn(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
    case 1:
    default: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = cubicIn(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
  }
}

const lerpSaturationFn = (optionNum: number) => {
  switch (optionNum) {
    case 0: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = quintIn(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
    case 1:
    default: {
      return function (start: number, end: number, pct: number) {
        let lerpPercent = linear(pct)
        return (1.0 - lerpPercent) * start + lerpPercent * end
      }
    }
  }
}

export const gradientForAddress = (address: string) => {
  const bytes = arrayify(address).reverse()
  const hueShiftFn = lerpHueFn(bytes[3], bytes[6] % 2)
  const startHue = bscale(bytes[12], 360)
  const startLightness = bScaleRange(bytes[2], 32, 69.5)
  const endLightness = (97 + bScaleRange(bytes[8], 72, 97)) / 2
  let startSaturation = bScaleRange(bytes[7], 81, 97)
  let endSaturation = Math.min(startSaturation - 10, bScaleRange(bytes[10], 70, 92))

  const lightnessShiftFn = lerpLightnessFn(bytes[5] % 2)
  const saturationShiftFn = lerpSaturationFn(bytes[3] % 2)
  const inputs: ColorInput[] = [
    {
      h: hueShiftFn(startHue, 0),
      s: saturationShiftFn(startSaturation, endSaturation, 1),
      l: lightnessShiftFn(startLightness, endLightness, 1),
    },
    {
      h: hueShiftFn(startHue, 0.1),
      s: saturationShiftFn(startSaturation, endSaturation, 0.9),
      l: lightnessShiftFn(startLightness, endLightness, 0.9),
    },
    {
      h: hueShiftFn(startHue, 0.7),
      s: saturationShiftFn(startSaturation, endSaturation, 0.7),
      l: lightnessShiftFn(startLightness, endLightness, 0.7),
    },
    {
      h: hueShiftFn(startHue, 0.9),
      s: saturationShiftFn(startSaturation, endSaturation, 0.2),
      l: lightnessShiftFn(startLightness, endLightness, 0.2),
    },
    {
      h: hueShiftFn(startHue, 1),
      s: saturationShiftFn(startSaturation, endSaturation, 0),
      l: startLightness,
    },
  ]

  return inputs
    .map((c: ColorInput) => tinycolor(c))
    .map((tc: tinycolor.Instance) => tc.toHslString())
}

export const zorbImageSVG = (address: string) => {
  const gradientInfo = gradientForAddress(address)
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110">
  <defs>
    <radialGradient
      id="gzr"
      gradientTransform="translate(66.4578 24.3575) scale(75.2908)"
      gradientUnits="userSpaceOnUse"
      r="1"
      cx="0"
      cy="0%"
      >
      <stop offset="15.62%" stop-color="${gradientInfo[0]}" />
      <stop offset="39.58%" stop-color="${gradientInfo[1]}" />
      <stop offset="72.92%" stop-color="${gradientInfo[2]}" />
      <stop offset="90.63%" stop-color="${gradientInfo[3]}" />
      <stop offset="100%" stop-color="${gradientInfo[4]}" />
    </radialGradient>
  </defs>
  <g transform="translate(5,5)">
    <path
      d="M100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50Z"
      fill="url(#gzr)"
    /><path
      stroke="rgba(0,0,0,0.075)"
      fill="transparent"
      stroke-width="1"
      d="M50,0.5c27.3,0,49.5,22.2,49.5,49.5S77.3,99.5,50,99.5S0.5,77.3,0.5,50S22.7,0.5,50,0.5z"
    />
  </g>
</svg>
  `
}

export const zorbImageDataURI = (address: string) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    zorbImageSVG(address),
    'utf-8'
  ).toString('base64')}`
}

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const Zorb = ({
  size,
  address = NULL_ADDRESS,
}: {
  size?: number
  address: string
}) => {
  return (
    <div
      style={{
        height: size || 32,
        width: size || 32,
      }}
    >
      <img src={zorbImageDataURI(address)} />
    </div>
  )
}
