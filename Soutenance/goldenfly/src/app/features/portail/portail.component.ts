import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-portail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portail.component.html',
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

  // Propriété pour gérer l'état du menu mobile
  isMenuOpen = false;

  features = [
    {
      icon: 'plane',
      title: 'Vols Quotidiens',
      description: 'Des vols quotidiens vers plus de 50 destinations à travers le monde'
    },
    {
      icon: 'diamond',
      title: 'Service Premium',
      description: 'Un service de luxe avec des sièges confortables et des repas gastronomiques'
    },
    {
      icon: 'ticket',
      title: 'Réservation Facile',
      description: 'Réservez vos billets en quelques clics avec notre plateforme intuitive'
    },
    {
      icon: 'payment',
      title: 'Paiement Sécurisé',
      description: 'Payez avec Wave, Orange Money ou carte bancaire en toute sécurité'
    }
  ];

  destinations = [
    { 
      city: 'Paris', 
      code: 'CDG', 
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' 
    },
    { 
      city: 'New York', 
      code: 'JFK', 
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' 
    },
    { 
      city: 'Dubaï', 
      code: 'DXB', 
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' 
    },
    { 
      city: 'Abidjan', 
      code: 'ABJ', 
      country: 'Côte d\'Ivoire',
      image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800' 
    }
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

  // Méthode pour basculer l'état du menu mobile
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Helper pour récupérer l'icône SVG
  getIconSvg(iconName: string): string {
    const icons: { [key: string]: string } = {
      plane: `<svg class="w-16 h-16 mx-auto text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
      </svg>`,
      diamond: `<svg class="w-16 h-16 mx-auto text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>`,
      ticket: `<svg class="w-16 h-16 mx-auto text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
      </svg>`,
      payment: `<svg class="w-16 h-16 mx-auto text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>`
    };
    return icons[iconName] || '';
  }
}