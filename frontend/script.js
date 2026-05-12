const API_URL = 'http://localhost:3000/api/v1/notes';

document.addEventListener('DOMContentLoaded', fetchNotes);

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        const notes = await response.json();

        if (notes && Array.isArray(notes.data)) {
            renderNotes(notes.data);
        } else {
            renderNotes(Array.isArray(notes) ? notes : []);
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

function renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.forEach(note => {
        const dateObj = new Date(note.tanggal_dibuat);
        const dateStr = dateObj.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        const noteElement = document.createElement('div');
        noteElement.className = 'note-card';
        noteElement.innerHTML = `
            <h3>${note.judul}</h3>
            <span class="note-date"> ${dateStr} </span>
            <p>${note.isi}</p>
            <div class="action-btns">
                <button class="btn-edit" 
                        onclick="editNote(${note.id}, 
                        '${note.judul.replace(/'/g, "\\'")}', 
                        '${note.isi.replace(/'/g, "\\'")}')"> Edit </button>

                <button class="btn-delete" 
                        onclick="deleteNote(${note.id})"> Hapus </button>
            </div>
        `;
        notesList.appendChild(noteElement);
    });
}

async function saveNote() {
    const id = document.getElementById('note-id').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    if (!judul || !isi) {
        alert('Judul dan isi tidak boleh kosong!');
        return;
    }

    const noteData = { judul, isi };
    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteData)
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteData)
            });
        }
        
        resetForm();
        fetchNotes();

    } catch (error) {
        console.log('Validation error:', error);
    }
}

function editNote(id, judul, isi) {
    document.getElementById('form-title').innerText = 'Edit Catatan';
    document.getElementById('note-id').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;
    document.getElementById('cancel-button').style.display = 'inline-block';
}

async function deleteNote(id) {
    if (confirm('Apakah anda yakin ingin menghapus catatan ini?')) { 
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }
}

function resetForm() {
    document.getElementById('form-title').innerText = 'Tambah Catatan';
    document.getElementById('note-id').value = '';
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    document.getElementById('cancel-button').style.display = 'none';
}
