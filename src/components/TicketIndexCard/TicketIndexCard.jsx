import "./styles.css"
import { Link } from "react-router";
export default function TicketIndexCard({ticket}) {
  return (
        <div className="cat-index-card">
            <Link to={`/tickets/${ticket.id}`}>
            <div className="ticket-index-card-content">
                <h2>{ticket.title}</h2>
                <p>   {`${ticket.content}`}</p>
                <p><small>{ticket.created_at.slice(0,10)}</small></p>
            </div>
            </Link>
        </div>
    )
}
