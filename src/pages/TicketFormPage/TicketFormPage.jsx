// IMPORTS
import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";

// APIs
import * as ticketAPI from "../../utilities/tickets-api";

export default function TicketFormPage({ profileDetail, managersList, createTicket, editTicket, deleteTicket }) {
    const navigate = useNavigate();
    const initialState = { title: "", content: "", created_by: profileDetail.id, assigned_to: "" }
    const [formData, setFormData] = useState(initialState);
    const [ticketDetail, setTicketDetail] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const ticket = await ticketAPI.show(id);
                // console.log("ticket line 19: ", ticket)
                setTicketDetail(ticket);
                setFormData(ticket)

            } catch (err) {
                console.log(err);
                setTicketDetail(null);
                setFormData(initialState)
            }
        }
        if ((editTicket || deleteTicket) && id) getAndSetDetail()
    }, [id])

    // console.log(formData, createTicket, editTicket, deleteTicket, id)



    function handleChange(evt) {
        const updatedData = { ...formData };
        setFormData({ ...updatedData, [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
        try {
            evt.preventDefault();

            const newTicket = editTicket ? await ticketAPI.update(formData, formData.id) : await ticketAPI.create(formData, formData.created_by);
            console.log(newTicket, 'hererere')
            setFormData(initialState)
            navigate(`/tickets/${newTicket.id}`)
        } catch (err) {
            console.log(err);
        }
    }
    async function handleDelete(evt) {
        evt.preventDefault();
        const response = await ticketAPI.deleteTicket(id)
        if (response.success) {
            setFormData(initialState)
            navigate("/tickets");
        }
    }



    if (deleteTicket && !ticketDetail) return <h1>Loading</h1>;
    if (deleteTicket && ticketDetail)
        return (
            <>
                <div className="page-header">
                    <h1>Delete Ticket?</h1>
                </div>
                <div className="delete-card">
                    <p className="delete-text">Are you sure you want to delete <strong>"{ticketDetail.title}"</strong>?</p>
                    <form onSubmit={handleDelete} className="delete-actions">
                        <Link to={`/tickets/${ticketDetail.id}`} className="btn secondary"> Cancel </Link> 
                        <button type="submit" className="btn danger"> Delete </button>
                    </form>
                </div>
            </>
        );

    if (editTicket && !ticketDetail) return <h1>Loading</h1>;
    if (createTicket || editTicket)
        return (
            <>
                <div className="page-header">
                    {editTicket ? (
                        <h1>Edit {ticketDetail.title}'s Info</h1>
                    ) : (
                        <h1>Add a Ticket</h1>
                    )}
                </div>

                <div className="form-card">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <table className="form-table">
                            <tbody>
                                {!editTicket && (
                                    <tr>
                                        <th><label htmlFor="id_title">Title:</label></th>
                                        <td>
                                            <input value={formData.title} type="text" name="title" maxLength="100" required id="id_title" onChange={handleChange} />
                                        </td>
                                    </tr>)}
                                <tr>
                                    <th><label htmlFor="id_content">Content:</label></th>
                                    <td>
                                        <textarea value={formData.content} name="content" cols="40" rows="8" maxLength="250" required id="id_content" onChange={handleChange} ></textarea>
                                    </td>
                                </tr>
                                
                                {!editTicket && (
                                <tr>
                                    <th><label htmlFor="id_manager">Manager:</label></th>
                                    <td>
                                        <select id="id_manager" name="assigned_to" value={formData.assigned_to} onChange={handleChange} required >
                                            <option value="">Select a manager</option>
                                            {managersList?.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.nickname}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>

                        <div className="form-actions">
                            <button type="submit" className="btn submit">Submit</button>
                        </div>
                    </form>
                </div>
            </>
        )
}


