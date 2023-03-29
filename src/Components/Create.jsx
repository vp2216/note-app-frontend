import "../Styles/Create.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdHome, MdLogout } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");

  function add(e) {
    e.preventDefault();
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    fetch("https://note-app-exmz.onrender.com/notes/", {
      method: "POST",
      body: formData,
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/main");
          return;
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <>
      {sessionStorage.getItem("token") ? (
        <div className="main">
          <nav className="nav">
            <div className="main-nav">
              <span className="icon-body" onClick={() => navigate("/main")}>
                <MdHome className="icon" />
                Home
              </span>
            </div>
            <span
              className="icon-body"
              onClick={() => {
                sessionStorage.setItem("token", "");
                navigate("/");
              }}
            >
              <MdLogout className="icon" />
              Logout
            </span>
          </nav>
          <main className="create-body">
            <form>
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                value={title}
                className="create-input"
              />
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDesription(e.target.value)}
                placeholder="Write your note here..."
                className="create-input create-textarea"
              ></textarea>
              <button className="icon-body create-btn" onClick={add}>
                <IoMdAdd className="icon black" />
                Add
              </button>
            </form>
          </main>
        </div>
      ) : (
        <div className="error">
          <span className="error-head">SESSION EXPIRED</span>
          <span className="error-body">Please login again</span>
          <button className="error-btn" onClick={() => navigate("/")}>
            <MdLogout className="icon" />
            Go to login
          </button>
        </div>
      )}
    </>
  );
}
