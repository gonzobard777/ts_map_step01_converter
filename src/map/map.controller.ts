import countriesMerged from './geojson/50m_countries_merged.json'

export class MapController {
  element: HTMLCanvasElement
  context: CanvasRenderingContext2D;

  get state() {
    return {};
  }

  setCanvasElement(element: HTMLCanvasElement) {
    this.element = element;
    this.context = element.getContext('2d');
  }

}