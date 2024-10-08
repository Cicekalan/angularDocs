import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
    providedIn: 'root',
})
export class NotesService {
    private notes: Note[] = [];
    private nextId = 1;

    addNote(content: string) {
        const note: Note = { id: this.nextId++, content };
        this.notes.push(note);
    }

    getNotes(): Note[] {
        return this.notes;
    }

    deleteNote(id: number) {
        this.notes = this.notes.filter(note => note.id !== id);
    }
}
