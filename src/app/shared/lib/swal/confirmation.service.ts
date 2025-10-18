import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Observable } from 'rxjs';

export interface ConfirmOptions {
    icon?: SweetAlertIcon;
    confirmText?: string;
    cancelText?: string;
}

const swalWithDeleteButtons = Swal.mixin({
    customClass: {
        confirmButton: "app-btn app-btn-outline-danger app-btn-rounded focus-none",
        cancelButton: "app-btn app-btn-primary app-btn-rounded focus-none me-2"
    },
    buttonsStyling: false
});

const swalWithPromptButtons = Swal.mixin({
    customClass: {
        confirmButton: "app-btn app-btn-primary app-btn-rounded focus-none",
        cancelButton: "app-btn app-btn-outline-danger app-btn-rounded focus-none me-2"
    },
    buttonsStyling: false
});

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
    delete(
        message: string,
        title: string = 'Delete',
        options?: ConfirmOptions
    ): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            swalWithDeleteButtons.fire({
                title,
                text: message,
                icon: options?.icon ?? 'warning',
                showCancelButton: true,
                confirmButtonText: options?.confirmText ?? 'Confirm Delete',
                cancelButtonText: options?.cancelText ?? 'Cancel',
                reverseButtons: true,
                allowOutsideClick: false,
                focusConfirm: false,
            }).then((result) => {
                observer.next(result.isConfirmed);
                observer.complete();
            });
        });
    }

    prompt(
        title: string = 'Enter value',
        inputLabel: string,
        defaultValue: string = ''
    ): Observable<string | null> {
        return new Observable<string | null>((observer) => {
            swalWithPromptButtons.fire({
                title,
                inputLabel: inputLabel,
                input: 'text',
                inputValue: defaultValue,
                showCancelButton: true,
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                icon: "question",
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please enter a value';
                    }
                    return null;
                },
            }).then((result) => {
                observer.next(result.isConfirmed ? result.value : null);
                observer.complete();
            });
        });
    }
}