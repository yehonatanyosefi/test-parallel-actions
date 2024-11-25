'use server'

export async function action() {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return 'ran'
}

export async function action2() {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return 'ran2'
}
