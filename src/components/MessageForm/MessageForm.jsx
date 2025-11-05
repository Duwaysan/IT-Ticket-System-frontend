import { useState } from "react";
import * as messageAPI from "../../utilities/messages-api"
import "./styles.css"

export default function MessageForm({ ticketDetail, ticketMessages, setTicketMessages, user, message }) {
    const initialState = {  ticket: ticketDetail.id, profile:user.id, content:""}
    const [formData, setFormData] = useState(initialState)

    
    function handleChange(evt) {
        const updatedData = { ...formData, [evt.target.name]: evt.target.value }
        setFormData(updatedData)
    }

    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            const updatedMessages = await messageAPI.create(formData, ticketDetail.id);
            setTicketMessages(updatedMessages)
            setFormData(initialState);
        } catch (err) {
            console.log(err);
            setTicketMessages([...ticketMessages])
        }
    }

    
if (ticketDetail.is_resolved) {
      return (
        <p className="ticket-closed-notice">
          This ticket has been closed. Messaging is disabled.
        </p>
      );
    }
    return (
<form className="message-form" onSubmit={handleSubmit}>
  <div className="input-group">
    <input type="text" name="content" value={formData.content} onChange={handleChange} placeholder="Write a message..." className="message-input" required/>
    <button type="submit" className="send-btn">Send</button>
  </div>
</form>
    )
}