import "./styles.css"
import { Link } from "react-router";
export default function TicketIndexCard({ticket, user}) {
  const isManager = user.isManager;  
  const createdBy = ticket.created_by_name
  const assignedTo = ticket.assigned_to_name 
  const statusText = ticket?.is_resolved ? "Closed" : "Open";
  const statusClass = ticket?.is_resolved ? "closed-ticket" : "open-ticket";
  const createdAt = new Date(ticket.created_at).toISOString().slice(0, 10)

  return (

    
       <div className="ticket-index-card">
      <Link to={`/tickets/${ticket.id}`}>
      <div className="ticket-index-card-content">
        <h2 className="ticket-title">{ticket?.title}</h2>

          {isManager ? 
          (<p><strong>Submitted by:</strong> {createdBy}</p>) 
          : 
          (<p><strong>Assigned to:</strong> {assignedTo}</p>)}
        <div className="ticket-meta">
        <p className="date"><small>{createdAt}</small></p>
        

          <span className={`status-badge ${statusClass}`}>{statusText}</span>
        </div>

      </div>
      </Link>
    </div>
  );
}
