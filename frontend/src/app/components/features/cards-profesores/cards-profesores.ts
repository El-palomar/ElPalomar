import { Component, OnInit } from '@angular/core';
import { IProfesor, ProfesoresService } from '@services/profesores';

@Component({
  selector: 'app-cards-profesores',
  imports: [],
  templateUrl: './cards-profesores.html',
  styleUrl: './cards-profesores.css',
  standalone: true
})
export class CardsProfesores implements OnInit {
  profesores: IProfesor[] = [];
  constructor(private profesoresService: ProfesoresService) {}
  ngOnInit(): void {
      this.profesoresService.getAllProfesores().subscribe({
      next: (data) => this.profesores = data,
      error: (err) => console.error('Error al cargar profesores', err)
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'public/images/default_profesor.jpg';
  }

}
