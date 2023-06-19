import classes from "../Table.module.css"

const Table = (props) => {
	return (
		<table className={classes.result}>
			<thead>
				<tr>
					<th>Year</th>
					<th>Total Savings</th>
					<th>Interest (Year)</th>
					<th>Total Interest</th>
					<th>Invested Capital</th>
				</tr>
			</thead>
			<tbody>
				{props.data.map((yearData) => (
					<tr key={yearData.year}>
						<td>${yearData.year}</td>
						<td>${yearData.savingsEndOfYear.toFixed(2)}</td>
						<td>${yearData.yearlyInterest.toFixed(2)}</td>
						<td>
							$
							{(
								yearData.savingsEndOfYear -
								props.initialInvestment -
								yearData.yearlyContribution * yearData.year
							).toFixed(2)}
						</td>
						<td>
							$
							{props.initialInvestment +
								yearData.yearlyContribution +
								yearData.year}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Table
