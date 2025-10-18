import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

@Injectable({ providedIn: 'root' })
export class ToastService {
  success(
    title: string,
    message: string = ''
  ) {
    toast.fire({
      icon: 'success',
      title: title,
      text: message
    });
  }
}