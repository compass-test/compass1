import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';

import { ActionsObservable } from 'redux-observable';
import { Subject } from 'rxjs/Subject';
import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';

interface EpicTest<T extends Action> {
  arrange: (input$: ActionsObservable<T>) => Observable<Action>;
  act: (input$: Subject<T>) => void;
  assert: (actions: Action[]) => void;
}

export default <T extends Action>({ arrange, act, assert }: EpicTest<T>) => {
  const input$ = new Subject<T>();
  const resultPromise = arrange(new ActionsObservable(input$)) // When the output stream completes, transform emitted values to an array of actions
    .reduce((acc: Action[], value: Action) => acc.concat(value), [])
    .do(assert)
    .toPromise();
  act(input$);
  return resultPromise;
};
