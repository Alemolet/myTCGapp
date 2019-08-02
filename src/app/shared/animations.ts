import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('HomePage => CollectionPage', [
      style({ height: '!' }),
      query(':enter', style({ transform: 'translateX(100%)' })),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      // animate the leave page away
      group([
          query(':leave', [
              animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
          ]),
          // and now reveal the enter
          query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
      ]),
  ]),
  transition('CollectionPage => HomePage', [
      style({ height: '!' }),
      query(':enter', style({ transform: 'translateX(-100%)' })),
      query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      // animate the leave page away
      group([
          query(':leave', [
              animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
          ]),
          // and now reveal the enter
          query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
      ]),
  ]),
]);

   // trigger('routeAnimations', [
   // transition('* <=> *', slideTo('right')),
   // transition('* <=> HomePage', slideTo('left')),
   // transition('CollectionPage <=> *', slideTo('left')),
   // transition('HomePage <=> *', slideTo('right'))
   // ]);


/*
function slideTo(direction: string){
    const optional = { optional: true };

*********BACKUP**********     
    return [
        query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              [direction]: 0,
              width: '100%'
            })
          ], optional),
          query(':enter', [
            style({
              [direction]: '-100%'
            }),
            group([
              query(':leave', [
                animate('600ms ease', style({ [direction]: '100%' }))
              ], optional),
              query(':enter', [
                animate('600ms ease', style({ [direction]: '0%' }))
              ], optional)
            ])
          ], optional)
        ]
      }*/