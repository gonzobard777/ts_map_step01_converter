import type {IPoint, IPointConverter} from '@do-while-for-each/math';
import {cast} from '@do-while-for-each/common';
import {geoStereographic} from 'd3-geo';
import countriesMerged from '../geojson/50m_countries_merged.json';
import {traverseGeojson} from '../util/traverse-geojson.ts';
import {drawPolygon} from '../util/draw-polygon.ts';

const sizes = {
  width: 800,
  height: 600,
};

export class MapController {
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D;

  geoToProj: IPointConverter;   // Сфера -> плоскость Проекции
  projToPixel: IPointConverter; // плоскость Проекции -> плоскость Пикселей
  geoToPixel: IPointConverter;  // Сфера -> плоскость Пикселей

  get state() {
    return {
      sizes: sizes,
    };
  }

  init(element: HTMLCanvasElement) {
    this.element = element;
    this.context = element.getContext('2d');

    this.geoToProj = geoStereographic().rotate([0, -90, 0]);

    // 1)
    // this.projToPixel = TODO

    // 2)
    // this.geoToPixel = TODO

    this.render();
  }

  drawPolygon = (points: IPoint[]): void => {
    drawPolygon(points, this.geoToPixel, this.context);
  }

  render() {
    traverseGeojson(
      cast(countriesMerged),
      this.drawPolygon,
    );
  }

}