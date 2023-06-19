import React, { useState } from "react"
import "./UserInput.css"
const initialUserInput = {
	"current-savings": 10000,
	"yearly-contribution": 1200,
	"expected-return": 7,
	duration: 10,
}
const UserInput = () => {
	const [userInput, setUserInput] = useState(initialUserInput)

	const calculateHandler = (userInput) => {
		// Should be triggered when form is submitted
		// You might not directly want to bind it to the submit event on the form though...

		const yearlyData = [] // per-year results

		let currentSavings = +userInput["current-savings"] // feel free to change the shape of this input object!
		const yearlyContribution = +userInput["yearly-contribution"] // as mentioned: feel free to change the shape...
		const expectedReturn = +userInput["expected-return"] / 100
		const duration = +userInput["duration"]

		// The below code calculates yearly results (total savings, interest etc)
		for (let i = 0; i < duration; i++) {
			const yearlyInterest = currentSavings * expectedReturn
			currentSavings += yearlyInterest + yearlyContribution
			yearlyData.push({
				// feel free to change the shape of the data pushed to the array!
				year: i + 1,
				yearlyInterest: yearlyInterest,
				savingsEndOfYear: currentSavings,
				yearlyContribution: yearlyContribution,
			})
		}

		// do something with yearlyData ...
	}

	const resetHandler = () => {
		setUserInput(initialUserInput)
	}
	const submitHandler = (e) => {
		e.preventDefault()
		console.log(e)
	}
	const inputChangeHandler = (input, value) => {
		setUserInput((prevInput) => {
			return {
				...prevInput,
				[input]: value,
			}
		})
	}
	return (
		<div>
			<form onSubmit={submitHandler} className='form'>
				<div className='input-group'>
					<p>
						<label htmlFor='current-savings'>Current Savings ($)</label>
						<input
							onChange={(event) =>
								inputChangeHandler(`current-savings`, event.target.value)
							}
							value={userInput["current-savings"]}
							type='number'
							id='current-savings'
						/>
					</p>
					<p>
						<label htmlFor='yearly-contribution'>Yearly Savings ($)</label>
						<input
							onChange={(event) =>
								inputChangeHandler(`yearly-contribution`, event.target.value)
							}
							value={userInput["yearly-contribution"]}
							type='number'
							id='yearly-contribution'
						/>
					</p>
				</div>
				<div className='input-group'>
					<p>
						<label htmlFor='expected-return'>
							Expected Interest (%, per year)
						</label>
						<input
							onChange={(event) =>
								inputChangeHandler(`expected-return`, event.target.value)
							}
							value={userInput["expected-return"]}
							type='number'
							id='expected-return'
						/>
					</p>
					<p>
						<label htmlFor='duration'>Investment Duration (years)</label>
						<input
							onChange={(event) =>
								inputChangeHandler(`duration`, event.target.value)
							}
							value={userInput["duration"]}
							type='number'
							id='duration'
						/>
					</p>
				</div>
				<p className='actions'>
					<button type='reset' className='buttonAlt' onClick={resetHandler}>
						Reset
					</button>
					<button type='submit' className='button'>
						Calculate
					</button>
				</p>
			</form>
		</div>
	)
}

export default UserInput
