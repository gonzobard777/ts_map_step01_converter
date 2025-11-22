import {useControllerState} from '@do-while-for-each/tree-cell-react';
import {useEffect, useRef} from 'react';
import {MapController} from './map.controller.ts';
import s from './map.module.css'

export function Map() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [{sizes}, controller] = useControllerState(() => new MapController());

  useEffect(() => {
    controller.init(ref.current!);
  }, [])

  return (
    <canvas width={sizes.width}
            height={sizes.height}
            className={s.canvas}
            ref={ref}/>
  );
}