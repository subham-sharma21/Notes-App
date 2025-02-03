class ModernNoteApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.addNoteBtn = document.getElementById('add-note');
        this.notesContainer = document.getElementById('notes-container');

        // Initialize theme
        this.themeToggle = document.getElementById('theme-toggle');
        this.theme = localStorage.getItem('theme') || 'light';
        this.initializeTheme();

        // Event listeners
        this.addNoteBtn.addEventListener('click', () => this.addNote());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        this.searchInput = document.getElementById('search-notes');

        // Add search event listener
        this.searchInput.addEventListener('input', () => this.searchNotes());

        this.loadNotes();
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeToggle();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const toggleIcon = this.themeToggle.querySelector('.toggle-icon');
        if (this.theme === 'dark') {
            toggleIcon.className = 'fas fa-sun toggle-icon';
        } else {
            toggleIcon.className = 'fas fa-moon toggle-icon';
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        this.notesContainer.innerHTML = '';
        this.notes.forEach((note, index) => {
            this.createNoteElement(note.text, index);
        });
    }

    addNote() {
        this.notes.push({
            text: '',
            date: new Date().toLocaleString()
        });
        this.createNoteElement('', this.notes.length - 1);
        this.saveNotes();
    }

    updateNote(index, text) {
        this.notes[index].text = text;
        this.saveNotes();
    }

    deleteNote(index) {
        this.notes.splice(index, 1);
        this.saveNotes();
        this.loadNotes();
    }

    createNoteElement(noteText, index) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'note-date';
        dateDiv.textContent = this.notes[index].date;

        const textarea = document.createElement('textarea');
        textarea.value = this.notes[index].text || '';
        textarea.placeholder = 'Write your note here...';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

        const actionDiv = document.createElement('div');
        actionDiv.className = 'note-actions';
        actionDiv.appendChild(deleteBtn);

        noteDiv.appendChild(dateDiv);
        noteDiv.appendChild(textarea);
        noteDiv.appendChild(actionDiv);

        textarea.addEventListener('input', (e) => {
            this.updateNote(index, e.target.value);
        });

        deleteBtn.addEventListener('click', () => {
            this.deleteNote(index);
        });

        this.notesContainer.appendChild(noteDiv);
    }

    searchNotes() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const notes = this.notesContainer.querySelectorAll('.note');

        notes.forEach(note => {
            const text = note.querySelector('textarea').value.toLowerCase();
            const isVisible = text.includes(searchTerm);
            note.style.display = isVisible ? 'flex' : 'none';

            // Add smooth transition
            if (isVisible) {
                note.style.opacity = '1';
                note.style.transform = 'scale(1)';
            } else {
                note.style.opacity = '0';
                note.style.transform = 'scale(0.95)';
            }
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new ModernNoteApp();
}); 