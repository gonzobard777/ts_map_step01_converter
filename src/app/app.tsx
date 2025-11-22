import {useControllerState} from '@do-while-for-each/tree-cell-react';
import {AppController} from './app.controller.ts';
import {Map} from '../map/map.tsx';
import './app.css'

export function App() {
  const [{info}, controller] = useControllerState(() => new AppController())
  return (
    <div>
      <div>{info}</div>
      <br/>
      <Map/>
    </div>
  )
}