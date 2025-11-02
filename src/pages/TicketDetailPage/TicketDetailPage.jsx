import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as ticketAPI from "../../utilities/tickets-api.js";




export default function TicketDetailPage() {
    const [ticketDetail, setTicketDetail] = useState(null);
    const { id } = useParams();
    useEffect(() => { 
      async function getAndSetDetail() {
        try {
          const ticket = await ticketAPI.show(id);
          setTicketDetail(ticket);
        } catch (err) {
          console.log(err);
          setTicketDetail(null);
        }
      }
      if (id) getAndSetDetail()
      }, [id])
    
    if (!ticketDetail) return <h3>Ticket Loading..</h3>

    return (
        <section className="detail-Ticket-container">
          <div className="sender"></div>
          <div className="Ticket-details">
            <h1>{ ticketDetail.title }</h1>
            <h3> {ticketDetail.content} </h3>
            <p>{  new Date(ticketDetail.created_at).toISOString().slice(0, 10) }</p>
          </div>
          <div className="ticket-actions">
  <Link to={`/tickets/edit/${ticketDetail.id}`} className="btn warn">Edit</Link>
  <Link to={`/tickets/confirm_delete/${ticketDetail.id}`} className="btn danger">Delete</Link>
</div>
        </section>
        
    )
}


