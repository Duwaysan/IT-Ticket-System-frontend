import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as ticketAPI from "../../utilities/tickets-api.js";
import * as messagesAPI from "../../utilities/messages-api";




export default function TicketDetailPage() {
	const [ticketDetail, setTicketDetail] = useState(null);
	const [ticketMessages, setTicketMessages] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		async function getAndSetDetail() {
			try {
				const ticket = await ticketAPI.show(id);
				setTicketDetail(ticket);
				const messages = await messagesAPI.ticketMessages(id);
				setTicketMessages(messages);
			} catch (err) {
				console.log(err);
				setTicketDetail(null);
				setTicketMessages(null);

			}
		}
		if (id) getAndSetDetail()
	}, [id])
	console.log(ticketMessages, id)

	if (!ticketDetail) return <h3>Ticket Loading..</h3>

	return (<>
		<main className="ticket-detail-page">
			<section className="detail-Ticket-container">
				<div className="sender"></div>
				<div className="Ticket-details">
					<h1>{ticketDetail.title}</h1>
					<h3> {ticketDetail.content} </h3>
					<p>{new Date(ticketDetail.created_at).toISOString().slice(0, 10)}</p>
				</div>
				<div className="ticket-actions">
					<Link to={`/tickets/edit/${ticketDetail.id}`} className="btn warn">Edit</Link>
					<Link to={`/tickets/confirm_delete/${ticketDetail.id}`} className="btn danger">Delete</Link>
				</div>
			</section>



			<section class="messages">
				<div class="subsection-title">
					<h2>Messages</h2>
				</div>
				<table>
					<thead>
						{ticketMessages.map((message, ind) => (
							<tr key={ind}>
								<td>{message.sender.nickname}</td>
								<td>{message.content}</td>
								<td>{message.created_at.slice(0, 10)}</td>
							</tr>
						))}
					</thead>
					<tbody>
						{/* {ticketMessages.map((meal, ind) => (
								<tr key={ind}>
								<td>{meal.date}</td>
								<td>{MEALS[meal.meal]}</td>
								</tr>
								))} */}
					</tbody>
				</table>
			</section>

		</main>
	</>
	)
}


