import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActividadesService, IActividad } from '@services/activities';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-actividades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-actividades.html',
  styleUrls: ['./formulario-actividades.css'],
})
export class FormularioActividadesComponent implements OnInit {
  actividades: IActividad[] = [];
  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  isEditMode = false;
  actividadEditando: number | null = null;
  mostrarFormulario = false; // ✅ NUEVO: controla si se muestra el formulario

  constructor(
    private fb: FormBuilder,
    private actividadesService: ActividadesService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: [''],
    });
  }

  ngOnInit() {
    this.cargarActividades();
  }

  cargarActividades() {
    this.loading = true;
    this.actividadesService.getAllActividades().subscribe({
      next: (data: IActividad[]) => {
        this.actividades = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar actividades:', error);
        this.errorMessage = 'Error al cargar las actividades';
        this.loading = false;
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const actividad: IActividad = this.form.value;

      if (this.isEditMode && this.actividadEditando) {
        // Actualizar
        this.actividadesService
          .updateActividad(this.actividadEditando, actividad)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Deporte actualizado correctamente',
                confirmButtonText: 'Aceptar'
              });
              this.cancelarEdicion();
              this.cargarActividades();
            },
            error: (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el deporte',
                confirmButtonText: 'Aceptar'
              });
              this.errorMessage = 'Error al actualizar el deporte';
              this.loading = false;
            },
          });
      } else {
        // Crear
        this.actividadesService.createActividad(actividad).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Creado!',
              text: 'Deporte creado correctamente',
              confirmButtonText: 'Aceptar'
            });
            this.cancelarEdicion();
            this.cargarActividades();
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al crear el deporte',
              confirmButtonText: 'Aceptar'
            });
            this.errorMessage = 'Error al crear el deporte';
            this.loading = false;
          },
        });
      }
    } else {
      this.errorMessage = 'Por favor completa el nombre del deporte';
    }
  }

  editarActividad(actividad: IActividad) {
    this.isEditMode = true;
    this.actividadEditando = actividad.id!;
    this.mostrarFormulario = true; // ✅ Mostrar formulario al editar
    this.form.patchValue({
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
    });
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion() {
    this.isEditMode = false;
    this.actividadEditando = null;
    this.mostrarFormulario = false; // ✅ Ocultar formulario
    this.form.reset();
    this.errorMessage = null;
  }

  eliminarActividad(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este deporte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadesService.deleteActividad(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'Deporte eliminado correctamente',
              confirmButtonText: 'Aceptar'
            });
            this.cargarActividades();
          },
          error: (error: any) => {
            console.error('Error al eliminar:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al eliminar el deporte',
              confirmButtonText: 'Aceptar'
            });
          },
        });
      }
    });
  }
}
