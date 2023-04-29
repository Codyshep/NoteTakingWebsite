const appTitle = 'My Note Taking App';
let notes = [];

function addNoteToList(note) {
  const notesList = document.getElementById('notes-list');
  const li = document.createElement('li');
  const title = document.createElement('h3');
  const content = document.createElement('p');
  const deleteButton = document.createElement('button');

  title.textContent = note.title;
  content.textContent = note.content;
  deleteButton.textContent = 'Delete Note';
  deleteButton.addEventListener('click', () => deleteNote(note));

  li.appendChild(title);
  li.appendChild(content);
  li.appendChild(deleteButton);
  notesList.appendChild(li);
}

function saveNote() {
  const title = document.getElementById('note-title').value;
  const content = document.getElementById('note-content').value;

  if (title === '' || content === '') {
    alert('Please enter a title and content for your note.');
    return;
  }

  const note = {
    title: title,
    content: content
  };

  notes.push(note);
  addNoteToList(note);
  saveNotes();
}

function deleteNote(note) {
  const noteIndex = notes.indexOf(note);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
    const notesList = document.getElementById('notes-list');
    const noteElement = notesList.querySelector(`li:nth-child(${noteIndex+1})`);
    notesList.removeChild(noteElement);
  }
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = localStorage.getItem('notes');

  if (savedNotes !== null) {
    notes = JSON.parse(savedNotes);

    for (const note of notes) {
      addNoteToList(note);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadNotes);

const saveButton = document.getElementById('save-note');
if (saveButton) {
  saveButton.addEventListener('click', saveNote);
} else {
  console.error('Could not find save-note button');
}

const notesList = document.getElementById('notes-list');
if (!notesList) {
  console.error('Could not find notes-list element');
} 

console.log(`Welcome to ${appTitle}!`);