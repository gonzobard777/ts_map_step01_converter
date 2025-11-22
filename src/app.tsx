import {useControllerState} from '@do-while-for-each/tree-cell-react';
import {AppController} from './app.controller.ts';
import './app.css'

export function App() {
  const [{info}, controller] = useControllerState(() => new AppController())
  return (
    <div>{info}</div>
  )
}