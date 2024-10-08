import { Component } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from './notes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  noteContent: string = '';
  notes: Note[] = [];

  constructor(private notesService: NotesService) { }

  addNote() {
    if (this.noteContent.trim()) {
      this.notesService.addNote(this.noteContent);
      this.noteContent = '';
      this.loadNotes();
    }
  }

  loadNotes() {
    this.notes = this.notesService.getNotes();
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id);
    this.loadNotes();
  }

  ngOnInit() {
    this.loadNotes();
  }
}
