'use client'
import { useState } from 'react'
import { action, action2 } from './action'
import { runParallelAction } from './parallel-util'

export function Cmp() {
	const [timeRanAction, setTimeRanAction] = useState(0)
	const [timeRanRoute, setTimeRanRoute] = useState(0)
	const [logs, setLogs] = useState<string[]>([])

	const addLog = (msg: string) => {
		setLogs((prev) => [...prev, `${Date.now()}: ${msg}`])
	}
	const runAction = async () => {
		const start = Date.now()

		// Wrap each action in a function that logs when it starts
		const wrappedAction1 = () => {
			addLog('Action 1 triggered')
			return runParallelAction(action())
		}

		const wrappedAction2 = () => {
			addLog('Action 2 triggered')
			return runParallelAction(action2())
		}
		const promises = [wrappedAction1(), wrappedAction2()]

		const res = await Promise.all(promises)
		const end = Date.now()
		setTimeRanAction(end - start)
		console.log('action', res)
	}
	const runRoute = async () => {
		const start = Date.now()
		const wrappedFetch1 = () => {
			addLog('Fetch 1 triggered')
			return fetch('/api/test')
		}
		const wrappedFetch2 = () => {
			addLog('Fetch 2 triggered')
			return fetch('/api/test2')
		}
		const promises = [wrappedFetch1(), wrappedFetch2()]
		const res = await Promise.all(promises)
		const end = Date.now()
		setTimeRanRoute(end - start)
		console.log('route', res)
	}
	return (
		<div>
			<button
				className="bg-blue-500 text-white p-2 rounded-md border border-black"
				onClick={async () => {
					await runAction()
					await runRoute()
				}}>
				run both
			</button>
			<div>timeRanAction: {timeRanAction}</div>
			<div>timeRanRoute: {timeRanRoute}</div>
			<div className="flex flex-col gap-1">
				logs:{' '}
				{logs.map((log, idx) => (
					<p key={log + idx}>{log}</p>
				))}
			</div>
		</div>
	)
}
