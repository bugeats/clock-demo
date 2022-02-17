// SVG drawing context data and related functions.
// Context includes the size of the view box and other special props.

import React from 'react';

import { Point, UnitValue } from '../support/types';

// The SVG "view box" numbers are mostly arbitrary when using non-scaling strokes,
// but the aspect ratio IS important.
// Here was abstract the dimensions and make a utility for SVG fragments to render inside this view box.
// Fractions can be expressed as a `UnitValue`, which makes it easier to create geometrically related drawings.
// Some of this is kinda awkward and unused since the only box we're currently working with is a perfect square.
interface Box {
  readonly width: (unit?: UnitValue) => Point;
  readonly height: (unit?: UnitValue) => Point;
  readonly size: (unit?: UnitValue) => Point;
  readonly centerX: Point;
  readonly centerY: Point;
}

export function createBox (_width: number, _height: number): Box {
  function width (unit = 1) {
    return _width * unit;
  }

  function height (unit = 1) {
    return _height * unit;
  }

  function size (unit = 1) {
    return ((width() + height()) / 2) * unit;
  }

  return Object.freeze({
    width,
    height,
    size,
    centerX: width() / 2,
    centerY: height() / 2,
  });
}

// -----------------------------------------------------------------------------

interface SvgContextData {
  box: Box;
  vectorProps: Record<string, string>;
}

export const SvgContext = React.createContext<SvgContextData>({
  box: createBox(0, 0),
  vectorProps: {},
});
