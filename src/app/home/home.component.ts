import { Component, ViewChild } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    loading: boolean;
    addedNote: string;
    allNotes: any;
    @ViewChild('textnote') inputName;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        this.getAllNotes();
    }

    getAllNotes() {

        this.accountService.getAllNotes()
            .pipe(first())
            .subscribe({
                next: (notes) => {
                    console.log(notes);
                    this.allNotes = notes;
                },
                error: error => {
                }
            });
    }

    addNote(note: string) {
        this.loading = true;
        this.accountService.addNotes(note)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.loading = false;
                    this.inputName.nativeElement.value = ' ';
                    alert("Note added");

                },
                error: error => {
                    this.loading = false;
                }
            });
    }

    onClose(noteId: number) {
        this.allNotes = this.allNotes.filter(item => item.noteID != noteId);
    }
    onGetAllNotes() {
        this.getAllNotes();
    }
}