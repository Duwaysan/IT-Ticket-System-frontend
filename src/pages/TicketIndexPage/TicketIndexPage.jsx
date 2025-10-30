import "./styles.css"
import { useState } from "react";
import { useEffect } from "react";
import * as TicketAPI from "../../utilities/tickets-api.js"

export default function TicketIndexPage({ user, setUser }) {
  const [allTickets, setAllTickets] = useState([
  //   {title:"Sample Ticket", description:"This is a sample ticket description."},
  // {title:"Another Ticket", description:"This is another sample ticket description."}
  ])
  
  const displayAllNotes = allTickets.map((n,idx)=>(
    // <NoteIndexCard key={idx} note={n}/>
    <div key={idx} className="index-card">
        <h2>{n.title}</h2>
        <p>{n.description}</p>
    </div>
  ))

  useEffect(function() {
    async function getAllTickets() {
        
        const allTicketData = await TicketAPI.profileTickets(user.profile.id)
        console.log(allTicketData, "all tickets data, line 18 TicketIndexPage")
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
