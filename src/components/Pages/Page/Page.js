import React, { Component } from 'react';
import Aux from '../../../hoc/Auks';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import classes from './Page.module.css';
import Fade from 'react-reveal/Fade';
import Button1 from '../../UI/Button/Button';
import Question from '../../UI/Question/Question';
import Navbar from 'react-bootstrap/Navbar';

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
					{/* {this.state.ID == 0 ? (
						<div className={classes.titlePage}>
							<button
								className={classes.titleButton}
								onClick={this.changePageHandler}
							></button>
						</div>
					) : ( */}
						<div className={classes.rascal}>
							{
								{
									//start page
									0: (
										<Aux>
										<h1>Map My College</h1>
										<Button1
											className={classes.Button1}
											size="lg"
											variant="light"
											clicked={this.changePageHandler}
										>
											<b>Start</b>
										</Button1>
										</Aux>
									),
									//How much is your tuition?
									1: (
										<Aux>
											<Fade bottom>
												<Question>
													How much is your college
													tuition?
												</Question>
												<ButtonGroup
													size="lg"
													className={classes.mb2}
												>
													<Button1
														variant="light"
														clicked={() =>
															this.changeTuitionHandler(
																60000,
																65000
															)
														}
													>
														Bigwood University{' '}
														<br />
														<br />
														Cost: $60000
														<br />
														Average salary: $65000
													</Button1>
													<Button1
														variant="light"
														clicked={() =>
															this.changeTuitionHandler(
																45000,
																50000
															)
														}
													>
														Middlerod College <br />
														<br />
														Cost: $45000 <br />
														Average salary: $50000
													</Button1>
													<Button1
														variant="light"
														clicked={() =>
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
													</Button1>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									2: (
										<Aux>
											<Fade bottom cascade duration={1000}>
												<div>
													<div>
												<Question>
													Which of the following is
													closest to your annual
													household income?
												</Question>
												</div>
											{/* </Fade>
											<Fade bottom> */}
												<ButtonGroup
													size="lg"
													className={classes.mb2}
												>
													<Button1
														variant="light"
														clicked={() =>
															this.changeTuitionHandler(
																-2500,
																this.state
																	.salary
															)
														}
													>
														$40,000
													</Button1>

													<Button1
														clicked={() =>
															this.changeTuitionHandler(
																-10000,
																this.state
																	.salary
															)
														}
													>
														$70,000
													</Button1>
													<Button1
														clicked={() =>
															this.changeTuitionHandler(
																-25000,
																this.state
																	.salary
															)
														}
													>
														$110,000
													</Button1>
													<Button1
														clicked={() =>
															this.changeTuitionHandler(
																-50000,
																this.state
																	.salary
															)
														}
													>
														$160,000
													</Button1>
												</ButtonGroup>
												</div>
											</Fade>
										</Aux>
									),
									//Financial Aid/Merit Scholarship/Other
									3: (
										<Aux>
											<Fade bottom cascade>
												<div>
												<h1>
													According to your family
													income. You still have to
													borrow {this.state.tuition}{' '}
													for college.
												</h1>
												<div>
												<Button1
													clicked={
														this.changePageHandler
													}
												>
													Continue
												</Button1>
												</div>
												</div>
											</Fade>
										</Aux>
									),
									4: (
										<Aux>
											<Fade bottom>
												
												<h1>
													You applied for FAFSA and
													received the maximum amount
													of federal aid: 3500
													dollars!!!{' '}
												</h1>
												</Fade>
												<Fade bottom duration={1500}>
												<Button1
													clicked={() =>
														this.changeTuitionHandler(
															-5250,
															this.state.salary
														)
													}
												>
													Continue
												</Button1>
												
											</Fade>
										</Aux>
									),
									5: (
										<Aux>
											<Fade bottom>
												<Question>
													Make sure you apply for
													FAFSA for federal financial
													aid and CSS Profile for
													non-federal financial aid{' '}
												</Question>
												<h5>
													Both the CSS application and
													the FAFSA can be filed as
													early as October 1 and
													should be completed as soon
													as possible to take
													advantage of aid that is
													distributed on a first-come,
													first-served basis. All
													schools have their own
													deadlines in place for the
													CSS, but many require
													students to file the profile
													two weeks before the
													college's priority admission
													application deadline.
												</h5>
												<Button1
													clicked={() =>
														this.changePageHandler(
															7
														)
													}
												>
													Continue
												</Button1>
											</Fade>
										</Aux>
									),
									//Financial Aid
									7: (
										<Aux>
											{this.state.tuition > 0 ? (
												<Aux>
													<Fade bottom>
														<Question>
															You still need to
															pay $
															{this.state.tuition}{' '}
															for college
														</Question>
														<Fade bottom cascade>
														<div>
															The option left for
															you is student loan
														</div>
														
														<Button1
															clicked={
																this
																	.changePageHandler
															}
														>
															Get Student Loans
														</Button1>
														</Fade>
													</Fade>
												</Aux>
											) : (
												<h1>Congrats!!!</h1>
											)}
										</Aux>
									),
									8: (
										<Aux>
											<Fade bottom>
												<Question
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
												</Question>
												<Fade bottom cascade>
												<h4
													style={{
														marginBottom: '0%',
													}}
												>
													Type of Interest?
												</h4>
												</Fade>
												<ButtonGroup
													style={{
														marginBottom: '40%',
													}}
												>
													<Button1
														clicked={() =>
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
													</Button1>
													<Button1
														clicked={() =>
															this.changeInterestHandler(
																0.09
															)
														}
														variant="dark"
														size="lg"
													>
														Fixed (Interest:
														9%/year)
													</Button1>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									9: (
										<Aux>
											<Fade bottom>
												<div>
												<Question
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
												</Question>
												</div>
												</Fade>
												<Fade bottom cascade duration={1500}>
												<h3>
													What do you choose to do?
												</h3>
												<ButtonGroup
													style={{
														marginBottom: '40%',
													}}
												>
													<Button1
														clicked={() =>
															this.changePageHandler(
																11
															)
														}
														variant="dark"
														size="lg"
													>
														STUDY HARDER
													</Button1>
													<Button1
														clicked={() =>
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
													</Button1>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									10: (
										<Aux>
											<Fade bottom>
												<h1
													style={{width: '60%',
														margin: 'auto',
								
														fontSize:'1.5625rem'}}
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
												</h1>
												<Button1
													
													clicked={() =>
														this.changePageHandler(
															12
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button1>
											</Fade>
										</Aux>
									),
									11: (
										<Aux>
											<Fade bottom>
												<h1
													
												>
													Good on you for not giving
													up! you study for five hours
													a day, and you ace the final
													exam. looks like you’re
													still on track for a quick
													graduation.
												</h1>
												<Button1
													
													clicked={() =>
														this.changePageHandler(
															12
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button1>
											</Fade>
										</Aux>
									),
									12: (
										<Aux>
											<Fade bottom>
												<Question
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
												</Question>
												<Fade bottom cascade>
												<h3>
													What do you choose to do?
												</h3>
												</Fade>
												<ButtonGroup
													style={{
														marginBottom: '40%',
													}}
												>
													<Button1
														clicked={() =>
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
													</Button1>
													<Button1
														clicked={() =>
															this.changePageHandler(
																14
															)
														}
														variant="dark"
														size="lg"
													>
														EAT INSTANT NOODLES
													</Button1>
												</ButtonGroup>
											</Fade>
										</Aux>
									),
									13: (
										<Aux>
											<Fade bottom>
												<h1
													style={{
														marginBottom: '5%',
													}}
												>
													Oh no! you just missed your
													first payment. you are
													charged a 200 dollar late
													fee
												</h1>
												<Fade bottom>
												<Button1
													style={{
														marginBottom: '40%',
													}}
													clicked={() =>
														this.changePageHandler(
															15
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button1>
												</Fade>
											</Fade>
										</Aux>
									),
									14: (
										<Aux>
											<Fade bottom>
												<h1
													style={{
														marginBottom: '5%',
													}}
												>
													Nice job! you are keeping up
													with the student loans. your
													friends said that the meal
													was not worth it, so you
													definitely lucked out.
												</h1>
												<Fade bottom>
												<Button1
													style={{
														marginBottom: '40%',
													}}
													clicked={() =>
														this.changePageHandler(
															15
														)
													}
													variant="dark"
													size="lg"
												>
													Continue
												</Button1>
												</Fade>
											</Fade>
										</Aux>
									),
									15: (
										<Fade bottom>
											<Aux>
												<h1
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
												</h1>
												
											</Aux>
										</Fade>
									),
								}[this.state.ID]
							}
						</div>
					{/* )} */}
				</div>
				{this.state.ID > 7 && this.state.ID != 15 ? (
					<Fade bottom>
						<div>
					<Navbar bg="dark" fixed="bottom">
						<Navbar.Brand
							href="#home"
							style={{
								color: 'white',
								align: 'center',
								margin: 'auto',
							}}
						>
							$
							{(
								this.state.tuition *
								2 *
								(1 + this.state.interest)
							).toFixed(0)}{' '}
							IN DEBT
						</Navbar.Brand>
					</Navbar>
					</div>
					</Fade>
				) : (
					<div></div>
				)}
			</Aux>
		);
	}
}

export default Page;
