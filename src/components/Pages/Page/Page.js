import React, { Component } from 'react';
import Aux from '../../../hoc/Auks';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import classes from './Page.module.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Button1 from '../../UI/Button/Button'

let year,
	monthlyPay = 0;
class Page extends Component {
	state = {
		ID: 0,
		tuition: 0,
		Dtuition: 0,
		salary: 0,
		interest: 0,
	};
	calculatePayTime = () => {
		let salary = this.state.salary;
		let interest = this.state.interest;
		let loan = this.state.tuition;
		let sum = loan;
		let t = 0;
		while (loan > 0) {
			t += 1;
			loan *= 1 + interest;
			sum += loan * interest;
			loan -= salary * 0.15;
			salary *= 1.1;
		}
		year = t;
		monthlyPay = (sum / t / 12).toFixed(0);
	};
	componentDidMount = () => {
		if (this.state.ID == 15) {
			this.calculatePayTime();
		}
	};

	changePageHandler = (pg) => {
		if (pg == 15) {
			this.calculatePayTime();
		}
		if (pg >= 0) {
			this.setState({ ID: pg });
		} else {
			this.setState({ ID: this.state.ID + 1 });
		}
	};
	changeTuitionHandler = (dt, salary) => {
		let newT = 0;
		newT = Number(this.state.tuition + dt);
		this.setState({
			tuition: newT,
			salary: salary,
		});
		this.changePageHandler();
	};
	changeInterestHandler = (interest) => {
		this.setState({
			interest: interest,
		});
		this.changePageHandler();
	};
	handleChange = (event) => {
		this.setState({ Dtuition: event.target.value });
	};
	handleSubmit = (pg) => {
		let newTuition = 0;
		if (this.state.ID == 2) {
			newTuition = Number(this.state.tuition - this.state.Dtuition);
		} else {
			newTuition = Number(this.state.tuition - this.state.Dtuition);
		}

		this.setState({
			tuition: newTuition,
			Dtuition: 0,
		});
		this.changePageHandler(pg);
	};
	render() {
		return (
			<Aux>
				
				<div className={classes.Page}>
					
					{this.state.ID == 0 ? (
						<div className={classes.titlePage}>
							<Button1>abc</Button1>
							<button
								className={classes.titleButton}
								onClick={this.changePageHandler}
							></button>
						</div>
					) : (
						<div className={classes.rascal}>
							{
								{
									//start page
									0: (
										<Button
											className={classes.Button1}
											size="lg"
											variant="light"
											onClick={this.changePageHandler}
										>
											<b>Start</b>
										</Button>
									),
									//How much is your tuition?
									1: (
										<Aux>
											<Fade bottom>
												<h1>
													How much is your college
													tuition?
												</h1>
												<ButtonGroup
													size="lg"
													className={classes.mb2}
												>
													<Button
														variant="light"
														onClick={() =>
															this.changeTuitionHandler(
																75000,
																65000
															)
														}
													>
														Bigwood University{' '}
														<br />
														<br />
														Cost: $75000
														<br />
														Average salary: $65000
													</Button>
													<Button
														variant="light"
														onClick={() =>
															this.changeTuitionHandler(
																70000,
																50000
															)
														}
													>
														Middlerod College <br />
														<br />
														Cost: $70000 <br />
														Average salary: $50000
													</Button>
													<Button
														variant="light"
														onClick={() =>
															this.changeTuitionHandler(
																25000,
																45000
															)
														}
													>
														Smallcox University
														<br />
														<br />
														Cost: $25000
														<br />
														Average salary: $45000
													</Button>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									2: (
										<Aux>
											<Fade bottom>
												<div>
													<h1>
														How much can you afford
														for college?
													</h1>

													<Form
														className={classes.Form}
													>
														<Form.Control
															onChange={
																this
																	.handleChange
															}
															type="number"
															placeholder="$ you can pay per year"
														/>
														<Button
															style={{
																marginBottom:
																	'90%',
															}}
															variant="light"
															onClick={
																this
																	.handleSubmit
															}
														>
															Submit
														</Button>
													</Form>
												</div>
											</Fade>
										</Aux>
									),
									//Financial Aid/Merit Scholarship/Other
									3: (
										<Aux>
											<Fade bottom>
												<Button
													onClick={() =>
														this.changePageHandler(
															7
														)
													}
												>
													Next
												</Button>
											</Fade>
										</Aux>
									),
									//Financial Aid
									7: (
										<Aux>
											{this.state.tuition > 0 ? (
												<Aux>
													<Fade bottom>
														<h1
															style={{
																height: '10px',
																marginBottom:
																	'0%',
															}}
														>
															You still need to
															pay $
															{this.state.tuition}{' '}
															for college
														</h1>
														<div
															style={{
																height: '10px',
																marginBottom:
																	'10%',
															}}
														>
															The option left for
															you is student loan
														</div>
														<Button
															variant="dark"
															onClick={
																this
																	.changePageHandler
															}
														>
															Get Student Loans
														</Button>
													</Fade>
												</Aux>
											) : (
												<h1>Congrats</h1>
											)}
										</Aux>
									),
									8: (
										<Aux>
											<Fade bottom>
												<h1>
													{' '}
													<br />
												</h1>
												<h5
													style={{
														marginBottom: '5%',
													}}
												>
													{' '}
													The good thing about private
													loans is that they allow you
													to borrow as much as you
													need, while federal loans
													usually max out at around
													eight thousand dollars
												</h5>
												<h4
													style={{
														marginBottom: '0%',
													}}
												>
													Type of Interest?
												</h4>
												<ButtonGroup
													style={{
														marginBottom: '40%',
													}}
												>
													<Button
														onClick={() =>
															this.changeInterestHandler(
																0.11 *
																	Math.random() +
																	0.05
															)
														}
														variant="dark"
														size="lg"
													>
														Variable (Interest:
														5%-15%/year)
													</Button>
													<Button
														onClick={() =>
															this.changeInterestHandler(
																0.09
															)
														}
														variant="dark"
														size="lg"
													>
														Fixed (Interest:
														9%/year)
													</Button>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									9: (
										<Aux>
											<Fade bottom>
												<h1>
													Second Year Loan: $
													{(
														this.state.tuition *
														2 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h5
													style={{
														marginBottom: '5%',
													}}
												>
													{' '}
													School is getting really
													difficult. all of your
													classes have so much
													homework, you begin to
													question your chosen major.
												</h5>
												<h3>
													What do you choose to do?
												</h3>
												<ButtonGroup
													style={{
														marginBottom: '40%',
													}}
												>
													<Button
														onClick={() =>
															this.changePageHandler(
																11
															)
														}
														variant="dark"
														size="lg"
													>
														STUDY HARDER
													</Button>
													<Button
														onClick={() =>
															this.changeTuitionHandler(
																0.5 *
																	this.state
																		.tuition,
																this.state
																	.salary
															)
														}
														variant="dark"
														size="lg"
													>
														PICK A NEW MAJOR
													</Button>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									10: (
										<Aux>
											<Fade bottom>
												<h1>
													Second Year Loan: $
													{(
														this.state.tuition *
														2 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h4
													style={{
														marginBottom: '0%',
													}}
												>
													This might be difficult for
													you and extend your time in
													college. although sometimes
													it’s worth it to follow your
													dreams, you definitely need
													to consider that you may
													spend over six years in
													college to get a new
													bachelor’s degree… and
													that’s even more loans you
													have to take out!
												</h4>
												<Button
													style={{
														marginBottom: '50%',
													}}
													onClick={() =>
														this.changePageHandler(
															12
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button>
											</Fade>
										</Aux>
									),
									11: (
										<Aux>
											<Fade bottom>
												<h1>
													Second Year Loan: $
													{(
														this.state.tuition *
														2 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h4
													style={{
														marginBottom: '5%',
													}}
												>
													Good on you for not giving
													up! you study for five hours
													a day, and you ace the final
													exam. looks like you’re
													still on track for a quick
													graduation.
												</h4>
												<Button
													style={{
														marginBottom: '40%',
													}}
													onClick={() =>
														this.changePageHandler(
															12
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button>
											</Fade>
										</Aux>
									),
									12: (
										<Aux>
											<Fade bottom>
												<h1>
													Graduating Year Loan: $
													{(
														this.state.tuition *
														4 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h5
													style={{
														marginBottom: '5%',
													}}
												>
													{' '}
													While we process your
													approximated time… you just
													graduated, and your friends
													want to go out to eat at a
													fancy new restaurant. you
													know that you still have
													your monthly payment for
													student loans.
												</h5>
												<h3>
													What do you choose to do?
												</h3>
												<ButtonGroup
													style={{
														marginBottom: '40%',
													}}
												>
													<Button
														onClick={() =>
															this.changeTuitionHandler(
																50,
																this.state
																	.salary
															)
														}
														variant="dark"
														size="lg"
													>
														GO OUT TO EAT
													</Button>
													<Button
														onClick={() =>
															this.changePageHandler(
																14
															)
														}
														variant="dark"
														size="lg"
													>
														EAT INSTANT NOODLES
													</Button>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									13: (
										<Aux>
											<Fade bottom>
												<h1>
													Graduating Year Loan: $
													{(
														this.state.tuition *
														4 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h4
													style={{
														marginBottom: '5%',
													}}
												>
													Oh no! you just missed your
													first payment. you are
													charged a 200 dollar late
													fee
												</h4>
												<Button
													style={{
														marginBottom: '40%',
													}}
													onClick={() =>
														this.changePageHandler(
															15
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button>
											</Fade>
										</Aux>
									),
									14: (
										<Aux>
											<Fade bottom>
												<h1>
													Graduating Year Loan: $
													{(
														this.state.tuition *
														4 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h4
													style={{
														marginBottom: '5%',
													}}
												>
													Nice job! you are keeping up
													with the student loans. your
													friends said that the meal
													was not worth it, so you
													definitely lucked out.
												</h4>
												<Button
													style={{
														marginBottom: '40%',
													}}
													onClick={() =>
														this.changePageHandler(
															15
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button>
											</Fade>
										</Aux>
									),
									15: (
										<Fade bottom>
											<Aux>
												<h1>
													Graduating Year Loan: $
													{(
														this.state.tuition *
														4 *
														(1 +
															this.state.interest)
													).toFixed(0)}
													<br />
												</h1>
												<h4
													style={{
														marginBottom: '5%',
													}}
												>
													Finally you got a job. You
													end up with $
													{(
														this.state.tuition *
														4 *
														(1 +
															this.state.interest)
													).toFixed(0)}{' '}
													to pay. Assuming your salary
													increase 10% per year and
													you pay 15% of your salary
													for the loan, according to
													the average salary of your
													college, you will need{' '}
													{year} year to pay the loan.
													Monthly Payment: $
													{monthlyPay}
												</h4>
												<Button
													style={{
														marginBottom: '40%',
													}}
													onClick={() =>
														this.changePageHandler(
															15
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button>
											</Aux>
										</Fade>
									),
								}[this.state.ID]
							}
						</div>
					)}
				</div>
			</Aux>
		);
	}
}

export default Page;
