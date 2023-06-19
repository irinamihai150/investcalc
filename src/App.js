import { useState } from "react"
import Header from "./components/Header"
import Table from "./components/Table"
import UserInput from "./components/UserInput"

function App() {
	const [userInput, setUserInput] = useState(null)
	const [results, setResults] = useState(null)

	const calculateHandler = (userInput) => {
		let currentSavings = +userInput["current-savings"]
		const yearlyContribution = +userInput["yearly-contribution"]
		const expectedReturn = +userInput["expected-return"] / 100
		const duration = +userInput["duration"]
		const yearlyData = []

		if (userInput) {
			for (let i = 0; i < duration; i++) {
				const yearlyInterest = currentSavings * expectedReturn
				currentSavings += yearlyInterest + yearlyContribution
				yearlyData.push({
					year: i + 1,
					yearlyInterest: yearlyInterest,
					savingsEndOfYear: currentSavings,
					yearlyContribution: yearlyContribution,
				})
			}
		}

		setResults(yearlyData)
	}

	return (
		<div>
			<Header />
			<UserInput onCalculate={calculateHandler} />
			{results ? (
				<Table
					data={results}
					initialInvestment={userInput ? userInput["current-savings"] : 0}
				/>
			) : (
				<p>No data available.</p>
			)}
		</div>
	)
}

export default App
