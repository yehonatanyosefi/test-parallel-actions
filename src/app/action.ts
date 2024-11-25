'use server'

import { createParallelAction } from './parallel-util'

async function action1() {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return 'ran'
}
export const action = createParallelAction(action1)

async function action2single() {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return 'ran2'
}
export const action2 = createParallelAction(action2single)
// Is this parallelizing or running sequentially faster, but still waiting for an 'ok' from each one?
// From my testing it takes a tiny bit more for this to run on server actions than on routes, so it might still not solve the base problem.
// Will this work on all environments?
// Will this work with existing error handling and payloads including forms, files, components, etc..?
