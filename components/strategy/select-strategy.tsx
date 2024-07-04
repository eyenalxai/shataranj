import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import type { ControlMethod, SetPlayerStrategy } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { Color } from "chess.js"

type SelectStrategyProps = {
	value: ControlMethod
	player: Color
	setPlayerStrategy: SetPlayerStrategy
}

export const SelectStrategy = ({ value, player, setPlayerStrategy }: SelectStrategyProps) => {
	const strategyNames: Record<ControlMethod, string> = {
		manual: "manual",
		"random-move": "random move",
		berserk: "berserk",
		stockfish: "stockfish"
	}

	const playerColor = player === "w" ? "white" : "black"

	return (
		<div className={cn("flex", "flex-col", "justify-center", "items-start")}>
			<Select
				value={value}
				onValueChange={(value) => {
					setPlayerStrategy({
						player: player,
						strategy: value as ControlMethod
					})
				}}
			>
				<SelectTrigger className={cn("w-36")}>
					<SelectValue placeholder={`${playerColor} strategy`} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{playerColor}</SelectLabel>
						{Object.entries(strategyNames).map(([strategy, name]) => (
							<SelectItem key={strategy} value={strategy}>
								{name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
