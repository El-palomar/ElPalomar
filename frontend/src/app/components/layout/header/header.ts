import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) {}
  
  navigateToSection(sectionId: string): void {
    if (this.isOnHomePage()) {
      this.scrollToSection(sectionId);
    } else {
      this.router.navigate(['/']);
    }
  }
  
  private isOnHomePage(): boolean {
    const urlWithoutFragment = this.router.url.split('#')[0];
    return urlWithoutFragment === '/';
}
  
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
  
}
