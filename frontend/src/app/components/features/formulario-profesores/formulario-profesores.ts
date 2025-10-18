import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProfesor, ProfesoresService } from '@services/profesores';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-profesores',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-profesores.html',
  styleUrls: ['./formulario-profesores.css'],
  standalone: true
})
export class FormularioProfesoresComponent implements OnInit {
  profesores: IProfesor[] = [];
  form: FormGroup;
  profesorId?: number;
  loading: boolean = false;
  isEditMode = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      email: ['',[ Validators.email]],
      telefono: ['']
    })
  }

    isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  ngOnInit(): void {
    this.profesorId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.profesorId) {
      this.isEditMode = true
      this.loading = true
      this.profesoresService.getProfesor(this.profesorId).subscribe({
      next: (data) => {
              this.form.patchValue(data);
              this.loading = false;
            },
      error: (error: any) => {
        console.error('Error al cargar profesor:', error);
        this.errorMessage = 'Error al cargar profesor';
        this.loading = false;
      }
      })
    }
  }

    onSubmit() {
      if (this.form.valid) {
        this.loading = true;
        const profesor: IProfesor = this.form.value;
  
        if (this.profesorId) {
          // Actualizar
          this.profesoresService
            .updateProfesor(this.profesorId, profesor)
            .subscribe({
              next: () => {
                this.loading = false;
                Swal.fire({
                  icon: 'success',
                  title: '¡Actualizado!',
                  text: 'Profesor actualizado correctamente',
                  confirmButtonText: 'Aceptar'
                });
                this.cancelarEdicion();
                this.router.navigate(['/admin_dashboard']);
              },
              error: (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al actualizar el profesor',
                  confirmButtonText: 'Aceptar'
                });
                this.errorMessage = 'Error al actualizar el profesor';
                this.loading = false;
              },
            });
        } else {
          // Crear
          this.profesoresService.createProfesor(profesor).subscribe({
            next: () => {
              this.loading = false;
              Swal.fire({
                icon: 'success',
                title: '¡Creado!',
                text: 'Profesor creado correctamente',
                confirmButtonText: 'Aceptar'
              });
              this.cancelarEdicion();
              this.router.navigate(['/admin_dashboard']);
            },
            error: (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el profesor',
                confirmButtonText: 'Aceptar'
              });
              this.errorMessage = 'Error al crear el profesor';
              this.loading = false;
            },
          });
        }
      } else {
        this.errorMessage = 'Por favor completa los campos obligatorios';
      }
    }

    cancelarEdicion() {
    this.isEditMode = false;
    this.form.reset();
    this.errorMessage = null;
  }

}
