import {useControllerState} from '@do-while-for-each/tree-cell-react';
import {useEffect, useRef} from 'react';
import {MapController} from './map.controller.ts';

export function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [{}, controller] = useControllerState(() => new MapController());

  useEffect(() => {
    controller.setCanvasElement(canvasRef.current!)
  }, [])

  return (
    <div>
      <canvas ref={canvasRef}/>
    </div>
  );
}