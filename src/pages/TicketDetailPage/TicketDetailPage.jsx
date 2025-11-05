import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as ticketAPI from "../../utilities/tickets-api";
import * as messagesAPI from "../../utilities/messages-api";
import { getAIResponse } from "../../utilities/tickets-api";
import MessageIndexCard from "../../components/MessageIndexCard/MessageIndexCard.jsx";
import MessageForm from "../../components/MessageForm/MessageForm.jsx";
import Modal from "../../components/Modal/Modal.jsx";

// Icons
import { ArrowLeft } from "lucide-react";

export default function TicketDetailPage({ user }) {
  const [ticketDetail, setTicketDetail] = useState(null);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiErr, setAiErr] = useState("");

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
        setTicketMessages([]);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  if (!ticketDetail) return <h3>Ticket Loading..</h3>;

  const displayAllMessages = ticketMessages.map((m) => (
    <MessageIndexCard key={m.id} message={m} user={user} ticketMessages={ticketMessages} setTicketMessages={setTicketMessages} isClosed={ticketDetail.is_resolved} />
  ));

  async function handleAI() {
    setLoadingAI(true);
    const res = await ticketAPI.getAIResponse(ticketDetail.id);
    setAiText(res.ai_response);
    setLoadingAI(false);
    setAiOpen(true);
  }
  async function handleAIRequest() {
    try {
      setAiLoading(true);
      setAiErr("");
      const res = await getAIResponse(ticketDetail.id);
      setAiText(res?.ai_response || "No AI response.");
    } catch (e) {
      setAiErr("Failed to fetch AI response.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <>
      <main className="ticket-detail">
        <header className="detail-header">
          <Link to="/tickets" className="back-link"> <ArrowLeft size={12} /> Back to tickets </Link> </header>

        {user.profile.is_manager && !ticketDetail.is_resolved && (
          <div className="close-ticket-bar">
            <button
              className="btn close" onClick={async () => {
                try {
                  const updatedTicket = await ticketAPI.update(
                    { ...ticketDetail, is_resolved: true },
                    ticketDetail.id
                  );
                  setTicketDetail(updatedTicket);
                } catch (err) {
                  console.log("Error closing ticket:", err);
                }}}
            > Close Ticket </button>
          </div>
        )}

        <section className="detail-card">
          <div className="detail-layout">
            <aside className="creator-card">
              <div className="creator-avatar"> {(ticketDetail.created_by_obj.nickname?.[0]).toUpperCase()} </div>
              <div className="creator-name">{ticketDetail.created_by_obj.nickname}</div>
              <div className={`creator-role ${ticketDetail.created_by_obj.is_manager ? "manager" : "employee"}`}>
                {ticketDetail.created_by_obj.is_manager ? "Manager" : "Employee"}
              </div>

              <ul className="creator-meta">
                <li>
                  <strong>Created:</strong>{" "}
                  {new Date(ticketDetail.created_at).toISOString().slice(0, 10)}
                </li>
                <li> <strong>Assigned to:</strong>{" "} {ticketDetail.assigned_to_obj.nickname} </li>
                <li>
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${ticketDetail.is_resolved ? "closed" : "open"}`}>
                    {ticketDetail.is_resolved ? "Closed" : "Open"}
                  </span>
                </li>
              </ul>
            </aside>

            <article className="ticket-body">
              <div className="detail-top">
                <h1 className="title">{ticketDetail.title}</h1>
              </div>

              {ticketDetail.content && (
                <div className="content">
                  <p>{ticketDetail.content}</p>
                </div>
              )}

              {!user.profile.is_manager && !ticketDetail.is_resolved && (
                <>
                  <div className="actions">
                    <Link
                      to={`/tickets/edit/${ticketDetail.id}`}
                      className="btn warn"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/tickets/confirm_delete/${ticketDetail.id}`}
                      className="btn danger"
                    >
                      Delete
                    </Link>
                  </div>

                  <button className="ai-response-button" onClick={handleAI}>
                    AI Response
                  </button>

                  <Modal open={aiOpen} onClose={() => setAiOpen(false)} title="AI Response">
                    {loadingAI ? "Loading..." : aiText}
                  </Modal>
                </>
              )}

              {aiErr && <div className="ai-error">{aiErr}</div>}
              {aiText && (
                <div className="ai-panel">
                  <pre>{aiText}</pre>
                </div>
              )}
            </article>
          </div>
        </section>

        <section className="messages">
          <div className="subsection-title">
            <h2>Messages</h2>
          </div>

          <div className="messages-list">{displayAllMessages}</div>

          {!ticketDetail.is_resolved && (
            <div className="messages-form-wrap">
              <MessageForm
                ticketDetail={ticketDetail}
                ticketMessages={ticketMessages}
                setTicketMessages={setTicketMessages}
                user={user?.profile || user}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}
