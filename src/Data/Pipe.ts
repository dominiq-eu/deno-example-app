/*
    Pipe.ts

    A simple pipe implementation until the pipeline operator
    comes to typescript (tc39):
    https://github.com/tc39/proposal-pipeline-operator

    TODO: AsyncPipe()
*/

const Pipe = (x: any) => ({
    andThen: (fn: (x: any) => any) => Pipe(fn(x)),
    value: () => x,
})

export default Pipe
