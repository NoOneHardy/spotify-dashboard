import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  private abc = 'abcdefghijklmnopqrstuvwxyz'
  private ABC = this.abc.toUpperCase()
  private numbers = '0123456789'

  constructor() { }

  getString(length: number) {
    const possible = this.abc.concat(this.ABC, this.numbers)
    let string = ''
    for (let i = 0; i < length; i++) {
      string += possible.charAt(Math.random() * length)
    }
    return string
  }
}
