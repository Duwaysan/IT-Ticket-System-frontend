// IMPORTS
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router";

// APIs
import * as ticketAPI from "../../utilities/tickets-api";

export default function TicketFormPage({ profileDetail , managersList }) {
    const initialState = { title: "", content: "", created_by: profileDetail.id, assigned_to: "" }
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    function handleChange(evt) {
        const updatedData = { ...formData };
        setFormData({ ...updatedData, [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
      try {
        evt.preventDefault();
        const newTicket = await ticketAPI.create(formData, formData.created_by);
        setFormData(initialState)
        console.log("newTicket created:", newTicket);
        navigate(`/tickets/${newTicket.id}`)
    } catch (err) {
        console.log(err);
    }
}
// console.log("profileDetail in TicketFormPage:", profileDetail);
console.log("formData in TicketFormPage:", formData);
    return (<>
        <div className="page-header">
            <h1>Add a Ticket</h1>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th><label htmlFor="id_title">Title:</label></th>
                        <td><input value={formData.title} type="text" name="title" maxLength="100" required id="id_title" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_content">Content:</label></th>
                        <td>
                            <textarea value={formData.content} name="content" cols="40" rows="10" maxLength="250" required id="id_content" onChange={handleChange}></textarea>
                        </td>
                    </tr>
                    <tr>
              <th><label htmlFor="id_manager">Manager:</label></th>
              <td><select id="id_manager" name="assigned_to" value={formData.assigned_to} onChange={handleChange} required>
                  <option value="" >Select a manager</option>
                  {managersList?.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nickname}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
                    
                </tbody>
            </table>
            <button type="submit" className="btn end submit">Submit!</button>
        </form>
    </>)
}
