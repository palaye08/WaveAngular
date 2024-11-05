// toast.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { ToastService } from '../../service/toast.service';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="toast" [ngClass]="{'toast-success': type === 'success', 'toast-error': type === 'error'}">
      <div class="toast-content">
        <i *ngIf="type === 'success'" class="fas fa-check-circle"></i>
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 4px;
      color: white;
      z-index: 9999;
      animation: slideIn 0.5s ease-in-out;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .toast-success {
      background-color: #4CAF50;
    }

    .toast-error {
      background-color: #f44336;
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent implements OnDestroy {
  show = false;
  message = '';
  type: 'success' | 'error' = 'success';
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService.toast$.subscribe(toast => {
      this.message = toast.message;
      this.type = toast.type;
      this.show = true;
      setTimeout(() => this.show = false, 1000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}