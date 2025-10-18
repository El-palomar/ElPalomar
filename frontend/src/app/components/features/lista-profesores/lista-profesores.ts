import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfesor, ProfesoresService } from '@services/profesores';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-profesores',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-profesores.html',
  styleUrls: ['./lista-profesores.css'],
  standalone: true
})
export class ListaProfesoresComponent implements OnInit {
  profesores: IProfesor[] = [];
  form: FormGroup;
  loading= false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    private router: Router
  ){
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      telefono: ['']
    })
  }
  
  ngOnInit(): void {
    this.cargarProfesores();
  }

  nuevoProfesor() {
  this.router.navigate(['/admin/profesores/new']); 
  }

  cargarProfesores(){
    this.loading = true;
    this.profesoresService.getAllProfesores().subscribe({
      next: (data: IProfesor[]) => {
              this.profesores = data;
              this.loading = false;
            },
      error: (error: any) => {
        console.error('Error al cargar profesores:', error);
        this.errorMessage = 'Error al cargar los profesores';
        this.loading = false;
      }
    });

  }
   deleteProfesor(id: number): void {
     Swal.fire({
       title: '¿Estás seguro?',
       text: '¿Deseas eliminar este profesor?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#d33',
       cancelButtonColor: '#3085d6',
       confirmButtonText: 'Sí, eliminar',
       cancelButtonText: 'Cancelar'
     }).then((result) => {
       if (result.isConfirmed) {
         this.profesoresService.deleteProfesor(id).subscribe({
           next: () => {
             this.profesores = this.profesores.filter((a) => a.id !== id);
             Swal.fire({
               icon: 'success',
               title: '¡Eliminada!',
               text: 'Profesor eliminado correctamente',
               confirmButtonText: 'Aceptar',
               timer: 2000,
               timerProgressBar: true
             });
           },
           error: (err: any) => {
             console.error('Error eliminando profesor', err);
             Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'No se pudo eliminar al profesor',
               confirmButtonText: 'Aceptar'
             });
           },
         });
       }
     });
   }
  editarProfesor(id: number) {
  this.router.navigate(['/admin/profesores/edit', id]);
}
}
