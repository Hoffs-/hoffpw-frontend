import {trigger, animate, style, transition} from '@angular/core';
/**
 * Created by Hoffs on 2017-02-25.
 */

export function ListAnimation(duration: number) {
  return trigger('listAddRemove', [
    transition('void => *', [
      style({
        backgroundColor: 'transparent',
        height: '0'
      }),
      animate(duration + 'ms ease', style ({
        backgroundColor: '*',
        height: '*'
      }))
    ]),
    transition('* => void', [
      style({
        backgroundColor: '*',
        height: '*'
      }),
      animate(duration + 'ms ease', style ({
        color: 'transparent',
        height: '0'
      }))
    ])
  ]);
}
