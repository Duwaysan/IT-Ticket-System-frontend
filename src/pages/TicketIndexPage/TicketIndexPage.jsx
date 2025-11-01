import "./styles.css"
import { useState } from "react";
import { useEffect } from "react";
import * as TicketAPI from "../../utilities/tickets-api.js"
import NoteIndexCard from "../../components/TicketIndexCard/TicketIndexCard.jsx";

export default function TicketIndexPage({ user, setUser }) {
  const [allTickets, setAllTickets] = useState([
  //   {title:"Sample Ticket", description:"This is a sample ticket description."},
  // {title:"Another Ticket", description:"This is another sample ticket description."}
  ])
  
  const displayAllNotes = allTickets.map((t,idx)=>(
    <NoteIndexCard key={idx} ticket={t} user={user}/>
  ))

  useEffect(function() {
    async function getAllTickets() {
        
        const allTicketData = await TicketAPI.profileTickets(user.profile.id)
        setAllTickets(allTicketData)
    }
    if (allTickets.length === 0) getAllTickets()
  },[])
  return (<>

      <main className="ticket-index">
      <section className="page-header">
            <h1>Tickets List</h1>
        </section>
        <section className="index-card-container">
            {displayAllNotes}
        </section>
      </main>
    </>)
}
