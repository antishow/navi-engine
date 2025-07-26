declare interface StateTransition {
    to: State;
    predicate: (...args:any) => bool;
}

declare interface State {
    onEnter(): void;
    tick(): void;
    onExit(): void;
}

declare class StateMachine {
    constructor();

    currentState: State | null;
    transitions: WeakMap<State, StateTransition[]>;
    anyTransitions: StateTransition[];

    setState(state: State): void;
    tick(...args:any): void;
    addTransition(from: State, to: State, predicate: (...args:any) => bool): void;
    addAnyTransition(to: State, predicate: (...args:any) => bool): void;
}

export default StateMachine;