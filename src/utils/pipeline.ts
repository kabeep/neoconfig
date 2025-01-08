import to from './to';

type PipelineStep<T, R> = [(context: T) => Promise<R>, string];

async function pipeline<T = unknown, R = void>(
    context: T,
    steps: PipelineStep<T, R>[],
): Promise<void> {
    for (const [fn, msg] of steps) {
        const [err, res] = await to(fn(context));
        if (err) throw err;
        if (!res) throw new Error(msg);
    }
}

export default pipeline;
