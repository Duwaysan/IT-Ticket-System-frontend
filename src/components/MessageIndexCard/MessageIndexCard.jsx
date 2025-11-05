



import "./styles.css";
import * as messageAPI from "../../utilities/messages-api"
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function MessageIndexCard({ message, user, ticketMessages, setTicketMessages, isClosed }) {
  const isManager = message.sender.is_manager;
  const senderId  = message.sender.id 
  const currentId = user.profile.id
  const canEdit   = senderId === currentId;
   const initialState = { ticket: message.ticket, profile: user.profile.id, content: message.content};
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialState);
  
  const navigate = useNavigate()

  async function handleDelete(evt) {
    const response = await messageAPI.deleteMessage(message.ticket, message.id)
    if (response.success) {
      const updatedMessages = ticketMessages.filter((m) => m.id !== message.id);
      setTicketMessages(updatedMessages);
    }
  }

  
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }
  async function handleSave(evt) {
    evt.preventDefault();
      try {
        const updatedMessage =  await messageAPI.update(formData, message.ticket, message.id) 
        const updatedList = ticketMessages.map(m => (m.id === message.id ? updatedMessage : m));
        setTicketMessages(updatedList);
        setIsEditing(false);
        navigate(`/tickets/${message.ticket}`)
      } catch (err) {
        console.log(err);
      }
    }

  function handleCancel() {
    setFormData(initialState); 
    setIsEditing(false);
  }

  async function handleDelete(evt) {
    const response = await messageAPI.deleteMessage(message.ticket, message.id)
    if (response.success) { 
      const updatedMessages = ticketMessages.filter((m) => m.id !== message.id);
      setTicketMessages(updatedMessages);
    }
  }

  
  return (
    <div className={`message-card ${isManager ? "manager" : "employee"}`}>
      <div className="message-meta">
        <div className="avatar">{message.sender.nickname[0].toUpperCase()}</div>
        <p className="name">{message.sender.nickname}</p>
        <p className={`role ${isManager ? "role-manager" : "role-employee"}`}>
          {isManager ? "Manager" : "Employee"}
        </p>

        { !isClosed &&canEdit && (
          <div className="msg-actions">
            {!isEditing ? (<>
                <button className="msg-edit" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="msg-delete" onClick={handleDelete}>Delete</button>
              </>) : (<>
                <button className="msg-save" onClick={handleSave}>Save</button>
                <button className="msg-cancel" onClick={handleCancel}>Cancel</button>
              </>)}
          </div>)}
      </div>

      <div className="message-content">
        {!isEditing ? (<>
            <p className="text">{message.content}</p>
            <div className="time">{new Date(message.created_at).toLocaleString()}</div>
          </>) : (
          <form onSubmit={handleSave} className="msg-edit-form">
            <textarea className="msg-edit-input" name="content" value={formData.content} onChange={handleChange} rows={3} autoFocus required/>
          </form>
        )}
      </div>
    </div>
  );
}