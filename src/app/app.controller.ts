import {cell, makeObservable} from '@do-while-for-each/tree-cell'

export class AppController {

  info = 'Hello Map!1';

  constructor() {
    makeObservable(this, {
      info: cell,
    });
  }

  get state() {
    return {
      info: this.info,
    };
  }

}