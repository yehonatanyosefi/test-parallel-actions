import { NextResponse } from 'next/server'

export async function GET() {
	// Wait for 1 second
	await new Promise((resolve) => setTimeout(resolve, 1000))

	// Return the response
	return NextResponse.json({ message: 'ran' })
}
