import type {IPoint, IPointConverter} from '@do-while-for-each/math';

export interface IDrawPolygonOpt {
  strokeStyle?: string;
  fillStyle?: string;
}

export function drawPolygon(
  points: IPoint[],
  geoToPixel: IPointConverter,
  context: CanvasRenderingContext2D,
  opt: IDrawPolygonOpt = {},
) {
  context.beginPath();
  const lastPointIndex = points.length - 1;
  for (let i = 0; i < points.length; i++) {
    const point = geoToPixel(points[i]);
    if (i === 0) {
      context.moveTo(point[0], point[1]);
      continue;
    }
    if (i === lastPointIndex) {
      context.closePath();
    } else {
      context.lineTo(point[0], point[1]);
    }
  }
  if (opt.strokeStyle) {
    context.strokeStyle = opt.strokeStyle;
    context.stroke();
  }
  if (opt.fillStyle) {
    context.fillStyle = opt.fillStyle;
    context.fill();
  }
}