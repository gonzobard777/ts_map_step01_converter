import {useControllerState} from '@do-while-for-each/tree-cell-react';
import {useEffect, useRef} from 'react';
import {MapController} from './map.controller.ts';

export function Map() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [{sizes}, controller] = useControllerState(() => new MapController());

  useEffect(() => {
    controller.init(ref.current!);
  }, [])

  return (
    <div>
      <canvas width={sizes.width}
              height={sizes.height}
              ref={ref}/>
    </div>
  );
}