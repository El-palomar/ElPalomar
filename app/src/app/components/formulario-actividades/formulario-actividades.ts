// formulario-actividades.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


export interface Actividad {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  horario: string;
  instructor: string;
  cupoMaximo: number;
  inscritos: number;
  participantes: string[];
}

export interface CategoriaOption {
  value: string;
  label: string;
}

declare var bootstrap: any;

@Component({
  selector: 'app-formulario-actividades',
  templateUrl: './formulario-actividades.html',
  styleUrls: ['./formulario-actividades.css']
})
export class FormularioActividadesComponent implements OnInit, OnChanges {
  @Input() modalId: string = 'activityModal';
  @Input() actividadParaEditar: Actividad | null = null;
  @Input() editando: boolean = false;
  @Input() mostrarModal: boolean = false;

  @Output() actividadGuardada = new EventEmitter<Actividad>();
  @Output() modalCerrado = new EventEmitter<void>();
  @Output() actividadEditada = new EventEmitter<Actividad>();
  @Output() actividadEliminada = new EventEmitter<number>();
  @Output() inscripcionSolicitada = new EventEmitter<Actividad>();
  @Output() bajaSolicitada = new EventEmitter<{actividad: Actividad, participante: string}>();

  activityForm: FormGroup;
  
  // Datos de ejemplo - normalmente vendrían de un servicio
  actividades: Actividad[] = [
    {
      id: 1,
      nombre: 'Básquet',
      categoria: 'basquet',
      descripcion: 'Entrenamiento de básquet para todas las edades',
      horario: '18:00 - 20:00',
      instructor: 'Juan Pérez',
      cupoMaximo: 20,
      inscritos: 15,
      participantes: ['María García', 'Carlos López', 'Ana Martínez']
    },
    {
      id: 2,
      nombre: 'Fútbol Juvenil',
      categoria: 'futbol',
      descripcion: 'Fútbol para jóvenes de 12 a 18 años',
      horario: '16:00 - 18:00',
      instructor: 'Diego Silva',
      cupoMaximo: 25,
      inscritos: 22,
      participantes: ['Pedro Ruiz', 'Sofía Torres']
    },
    {
      id: 3,
      nombre: 'Vóley Femenino',
      categoria: 'voley',
      descripcion: 'Vóley competitivo femenino',
      horario: '19:00 - 21:00',
      instructor: 'Laura Vega',
      cupoMaximo: 12,
      inscritos: 8,
      participantes: ['Carmen Díaz', 'Isabel Moreno']
    }
  ];

  // Propiedades para la lista
  mostrarAcciones: boolean = true;
  mostrarParticipantes: boolean = true;
  permitirInscripciones: boolean = true;
  permitirBajas: boolean = true;
  mensajeVacio: string = 'Comienza agregando una nueva actividad deportiva.';
  
  categorias: CategoriaOption[] = [
    { value: 'basquet', label: 'Básquet' },
    { value: 'futbol', label: 'Fútbol' },
    { value: 'voley', label: 'Vóley' },
    { value: 'natacion', label: 'Natación' },
    { value: 'tenis', label: 'Tenis' },
    { value: 'handball', label: 'Handball' },
    { value: 'rugby', label: 'Rugby' }
  ];

  private modalInstance: any;

  private readonly categoriasInfo = {
    'basquet': { label: 'Básquet', class: 'bg-warning' },
    'futbol': { label: 'Fútbol', class: 'bg-success' },
    'voley': { label: 'Vóley', class: 'bg-info' },
    'natacion': { label: 'Natación', class: 'bg-primary' },
    'tenis': { label: 'Tenis', class: 'bg-secondary' },
    'handball': { label: 'Handball', class: 'bg-danger' },
    'rugby': { label: 'Rugby', class: 'bg-dark' }
  };

  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      descripcion: [''],
      horario: ['', Validators.required],
      instructor: ['', [Validators.required, Validators.minLength(3)]],
      cupoMaximo: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.initializeModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividadParaEditar'] && this.actividadParaEditar) {
      this.cargarDatosParaEdicion();
    }

    if (changes['mostrarModal']) {
      if (this.mostrarModal) {
        this.mostrarModalFormulario();
      } else {
        this.ocultarModalFormulario();
      }
    }
  }

  private initializeModal(): void {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
        this.modalCerrado.emit();
      });
    }
  }

  private cargarDatosParaEdicion(): void {
    if (this.actividadParaEditar) {
      this.activityForm.patchValue({
        nombre: this.actividadParaEditar.nombre,
        categoria: this.actividadParaEditar.categoria,
        descripcion: this.actividadParaEditar.descripcion,
        horario: this.actividadParaEditar.horario,
        instructor: this.actividadParaEditar.instructor,
        cupoMaximo: this.actividadParaEditar.cupoMaximo
      });
    }
  }

  mostrarModalFormulario(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  ocultarModalFormulario(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      
      let actividadGuardada: Actividad;

      if (this.editando && this.actividadParaEditar) {
        // Actualizar actividad existente
        actividadGuardada = {
          ...this.actividadParaEditar,
          ...formValue
        };
        
        // Actualizar en la lista local
        const index = this.actividades.findIndex(a => a.id === this.actividadParaEditar!.id);
        if (index !== -1) {
          this.actividades[index] = actividadGuardada;
        }
      } else {
        // Crear nueva actividad
        actividadGuardada = {
          id: Date.now(),
          ...formValue,
          inscritos: 0,
          participantes: []
        };
        
        // Agregar a la lista local
        this.actividades.push(actividadGuardada);
      }

      this.actividadGuardada.emit(actividadGuardada);
      this.ocultarModalFormulario();
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.activityForm.controls).forEach(key => {
        this.activityForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.activityForm.reset();
    Object.keys(this.activityForm.controls).forEach(key => {
      this.activityForm.get(key)?.markAsUntouched();
      this.activityForm.get(key)?.markAsPristine();
    });
  }

  // ======= MÉTODOS PARA LA LISTA DE ACTIVIDADES =======

  // TrackBy functions para mejor performance
  trackByActivityId(index: number, activity: Actividad): number {
    return activity.id;
  }

  trackByParticipant(index: number, participant: string): string {
    return participant;
  }

  // Métodos de categoría
  getCategoryClass(categoria: string): string {
    return this.categoriasInfo[categoria as keyof typeof this.categoriasInfo]?.class || 'bg-secondary';
  }

  getCategoryLabel(categoria: string): string {
    return this.categoriasInfo[categoria as keyof typeof this.categoriasInfo]?.label || categoria;
  }

  // Métodos de capacidad y progreso
  isActivityFull(activity: Actividad): boolean {
    return activity.inscritos >= activity.cupoMaximo;
  }

  getProgressPercentage(activity: Actividad): number {
    return Math.min((activity.inscritos / activity.cupoMaximo) * 100, 100);
  }

  getProgressBarClass(activity: Actividad): string {
    const percentage = this.getProgressPercentage(activity);
    if (percentage >= 100) return 'bg-danger';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-success';
  }

  getCapacityClass(activity: Actividad): string {
    if (this.isActivityFull(activity)) return 'text-danger fw-bold';
    if (activity.inscritos / activity.cupoMaximo >= 0.8) return 'text-warning fw-bold';
    return 'text-success';
  }

  // Métodos del botón de inscripción
  getInscriptionButtonClass(activity: Actividad): string {
    if (this.isActivityFull(activity)) return 'btn-secondary';
    return 'btn-primary';
  }

  getInscriptionButtonIcon(activity: Actividad): string {
    if (this.isActivityFull(activity)) return 'fas fa-ban';
    return 'fas fa-user-plus';
  }

  getInscriptionButtonText(activity: Actividad): string {
    if (this.isActivityFull(activity)) return 'Cupo Completo';
    return 'Inscribirse';
  }

  // Métodos de estado
  getStatusBadgeClass(activity: Actividad): string {
    if (this.isActivityFull(activity)) return 'status-full';
    if (activity.inscritos / activity.cupoMaximo >= 0.8) return 'status-almost-full';
    return 'status-available';
  }

  getStatusIcon(activity: Actividad): string {
    if (this.isActivityFull(activity)) return 'fas fa-times';
    if (activity.inscritos / activity.cupoMaximo >= 0.8) return 'fas fa-exclamation';
    return 'fas fa-check';
  }

  // Event handlers para la lista
  editarActividad(activity: Actividad): void {
    this.actividadParaEditar = activity;
    this.editando = true;
    this.cargarDatosParaEdicion();
    this.mostrarModalFormulario();
    this.actividadEditada.emit(activity);
  }

  eliminarActividad(activity: Actividad): void {
    if (confirm(`¿Estás seguro de que quieres eliminar la actividad "${activity.nombre}"?`)) {
      this.actividades = this.actividades.filter(a => a.id !== activity.id);
      this.actividadEliminada.emit(activity.id);
    }
  }

  inscribirse(activity: Actividad): void {
    if (!this.isActivityFull(activity)) {
      // Aquí puedes abrir un modal de inscripción o manejar la inscripción
      this.inscripcionSolicitada.emit(activity);
      
      // Por ahora, simulamos una inscripción automática
      const nombreUsuario = prompt('Ingrese su nombre:');
      if (nombreUsuario && nombreUsuario.trim()) {
        this.inscribirUsuarioEnActividad(activity, nombreUsuario.trim());
      }
    }
  }

  darDeBaja(activity: Actividad, participant: string): void {
    if (confirm(`¿Estás seguro de que quieres dar de baja a "${participant}" de "${activity.nombre}"?`)) {
      const index = this.actividades.findIndex(a => a.id === activity.id);
      if (index !== -1) {
        this.actividades[index].inscritos--;
        this.actividades[index].participantes = this.actividades[index].participantes.filter(p => p !== participant);
      }
      this.bajaSolicitada.emit({ actividad: activity, participante: participant });
    }
  }

  // Método helper para inscribir usuario
  private inscribirUsuarioEnActividad(activity: Actividad, nombreUsuario: string): void {
    const index = this.actividades.findIndex(a => a.id === activity.id);
    if (index !== -1) {
      // Verificar si ya está inscrito
      if (this.actividades[index].participantes.includes(nombreUsuario)) {
        alert('El usuario ya está inscrito en esta actividad');
        return;
      }

      // Verificar cupo disponible
      if (this.actividades[index].inscritos >= this.actividades[index].cupoMaximo) {
        alert('La actividad ha alcanzado el cupo máximo');
        return;
      }

      // Inscribir usuario
      this.actividades[index].inscritos++;
      this.actividades[index].participantes.push(nombreUsuario);
    }
  }

  // Método público para abrir nueva actividad (llamado desde el template padre)
  abrirNuevaActividad(): void {
    this.editando = false;
    this.actividadParaEditar = null;
    this.resetForm();
    this.mostrarModalFormulario();
  }

  // Métodos helper para validación
  isFieldInvalid(fieldName: string): boolean {
    const field = this.activityForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.activityForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${fieldName} es obligatorio`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `${fieldName} debe ser mayor a ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `${fieldName} debe ser menor a ${field.errors['max'].max}`;
      }
    }
    return '';
  }
}

