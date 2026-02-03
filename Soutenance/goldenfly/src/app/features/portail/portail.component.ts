import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-portail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./portail.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PortailComponent implements OnInit {
  router = inject(Router);

  features = [
    {
      icon: '✈️',
      title: 'Vols Quotidiens',
      description: 'Des vols quotidiens vers plus de 50 destinations à travers le monde'
    },
    {
      icon: '💎',
      title: 'Service Premium',
      description: 'Un service de luxe avec des sièges confortables et des repas gastronomiques'
    },
    {
      icon: '🎫',
      title: 'Réservation Facile',
      description: 'Réservez vos billets en quelques clics avec notre plateforme intuitive'
    },
    {
      icon: '💳',
      title: 'Paiement Sécurisé',
      description: 'Payez avec Wave, Orange Money ou carte bancaire en toute sécurité'
    }
  ];

  destinations = [
    { city: 'Paris', code: 'CDG', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
    { city: 'New York', code: 'JFK', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' },
    { city: 'Dubaï', code: 'DXB', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' },
    { city: 'Abidjan', code: 'ABJ', image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800' }
  ];

  ngOnInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}