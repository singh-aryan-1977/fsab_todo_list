import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = "http://localhost:3001/";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "api/todo_final/GetNotes");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ notes: data });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async addClick() {
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/todo_final/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  async deleteClick(id) {
    fetch(this.API_URL + "api/todo_final/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <header>
          <h1>TODO List</h1>
        </header>
        <section>
          <div className="input-container">
            <input id="newNotes" placeholder="Enter a new note" />
            <button onClick={() => this.addClick()}>Add Note</button>
          </div>
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id}>
                <span>{note.description}</span>
                <button onClick={() => this.deleteClick(note.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
