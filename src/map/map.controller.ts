import {Extent, identityMatrix, type IPoint, type IPointConverter, Matrix} from '@do-while-for-each/math';
import {cast} from '@do-while-for-each/common';
import {geoStereographic} from 'd3-geo';
import {drawPolygon, type IDrawPolygonOpt} from '../util/draw-polygon.ts';
import countriesGeojson from '../geojson/50m_countries_cut.json';
import {traverseGeojson} from '../util/traverse-geojson.ts';
import {MapConstant} from './map.constant.ts';

const countriesDrawOpts: IDrawPolygonOpt = {
  strokeStyle: MapConstant.borderColor,
  fillStyle: MapConstant.landFillColor,
};

export class MapController {
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D;

  geoToProj: IPointConverter;   // Сфера -> плоскость Проекции
  projToPixel: IPointConverter; // плоскость Проекции -> плоскость Пикселей
  geoToPixel: IPointConverter;  // Сфера -> плоскость Пикселей

  // Extent, заданный в гео-точках, для проекции StereoNorth.
  // На проекции данный экстент является квадратом!!!
  geoExtent = Extent.of(
    [-20.27278398848604, 51.85273787907249],
    [-165.85058279918894, 51.06553817785117],
    [56.828975051687344, 23.643222455037037],
  );


  get state() {
    return {
      sizes: MapConstant.sizes,
    };
  }

  init(element: HTMLCanvasElement) {
    this.element = element;
    this.context = element.getContext('2d');

    this.geoToProj = geoStereographic().rotate([0, -90, 0]);

    // 1)
    this.projToPixel = (point: IPoint): IPoint =>
      Matrix.apply(identityMatrix, point)

    // 2)
    this.geoToPixel = (point: IPoint): IPoint =>
      Matrix.apply(identityMatrix, point)

    this.render();
  }

  drawPolygon = (points: IPoint[]): void => {
    drawPolygon(points, this.geoToPixel, this.context, countriesDrawOpts);
  }

  render() {
    const {context} = this;
    context.fillStyle = MapConstant.waterFillColor;
    context.fillRect(0, 0, MapConstant.sizes.width, MapConstant.sizes.height);

    traverseGeojson(
      cast(countriesGeojson),
      this.drawPolygon,
    );
  }

}