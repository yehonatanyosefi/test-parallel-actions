'use client'
import { useState } from 'react'
import { action, action2 } from './action'

export function Cmp() {
	const [timeRanAction, setTimeRanAction] = useState(0)
	const [timeRanRoute, setTimeRanRoute] = useState(0)
	const runAction = async () => {
		const start = Date.now()
		const promises = [action(), action2()]
		const res = await Promise.all(promises)
		const end = Date.now()
		setTimeRanAction(end - start)
		console.log('action', res)
	}
	const runRoute = async () => {
		const start = Date.now()
		const promises = [fetch('/api/test'), fetch('/api/test2')]
		const res = await Promise.all(promises)
		const end = Date.now()
		setTimeRanRoute(end - start)
		console.log('route', res)
	}
	return (
		<div>
			<button
				onClick={async () => {
					await runAction()
					await runRoute()
				}}>
				run both
			</button>
			<div>timeRanAction: {timeRanAction}</div>
			<div>timeRanRoute: {timeRanRoute}</div>
		</div>
	)
}
