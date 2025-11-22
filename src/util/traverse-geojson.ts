import type {Feature, FeatureCollection, MultiPolygon, Polygon} from 'geojson';
import type {IPolygon} from '@do-while-for-each/math';

/**
 * Обход файла в формате GeoJSON
 */
export function traverseGeojson(
  geojson: FeatureCollection,
  nextFigureCallback: INextFigureCallback,
  afterFeatureCallback?: IAfterFeatureCallback
): void {
  for (const feature of geojson.features) {
    const {coordinates, type} = feature.geometry as Polygon | MultiPolygon;
    switch (type) {
      case 'Polygon':
        for (let i = 0; i < coordinates.length; i++) {
          nextFigureCallback(coordinates[i] as IPolygon, i, feature);
        }
        break;
      case 'MultiPolygon':
        for (let i = 0; i < coordinates.length; i++) {
          const multiPolygon = coordinates[i];
          for (let j = 0; j < multiPolygon.length; j++)
            nextFigureCallback(multiPolygon[j] as IPolygon, i, feature);
        }
        break;
      default:
        throw new Error(`traverseGeojson. Unexpected geometry type "${feature.geometry.type}"`);
    }
    afterFeatureCallback?.(feature);
  }
}

type INextFigureCallback = (polygon: IPolygon, index: number, feature: Feature) => void;
type IAfterFeatureCallback = (feature: Feature) => void;
