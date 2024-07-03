import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process"

export const getStockfishMove = async (fen: string, maxTime: number) => {
	const stockfish = spawn("stockfish")

	stockfish.stdin.write(`position fen ${fen}\n`)
	stockfish.stdin.write(`go movetime ${maxTime}\n`)

	return listenForBestMove(stockfish, fen, maxTime)
}

const listenForBestMove = (stockfish: ChildProcessWithoutNullStreams, fen: string, maxTime: number) => {
	stockfish.stdin.write(`position fen ${fen}\n`)
	stockfish.stdin.write(`go movetime ${maxTime}\n`)

	return new Promise((resolve, reject) => {
		stockfish.stdout.on("data", (data: Buffer) => {
			const output = data.toString()
			const match = output.match(/^bestmove\s(\S+)/m)
			if (match) {
				const bestMove = match[1]
				stockfish.stdin.end()
				resolve(bestMove)
			}
		})

		stockfish.stderr.on("data", (data: Buffer) => {
			reject(new Error(`Stockfish error: ${data.toString()}`))
		})

		stockfish.on("close", (code: number) => {
			if (code !== 0) reject(new Error(`Stockfish exited with code ${code}`))
		})
	}) as Promise<string>
}
