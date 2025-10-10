# 📚 Documentación de API - El Palomar

## 🔐 Autenticación - Usuarios `/api/usuarios/`


### 📝 Registro de Usuario
**Endpoint:** `POST /api/usuarios/registro/`

**Descripción:** Crea un nuevo usuario en el sistema.

**Body (JSON):**
```json
{
  "dni": "12345678",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "contraseña_segura123",
  "sexo": "M",
  "telefono": "351123456",  // Opcional
  "edad": 25  // Opcional
}
```

**Campos requeridos:** `dni`, `nombre`, `apellido`, `email`, `password`, `sexo`

---

### 🔑 Login (Obtener Token JWT)
**Endpoint:** `POST /api/usuarios/login/`

**Descripción:** Autentica al usuario y retorna tokens de acceso.

**Body (JSON):**
```json
{
  "email": "juan@example.com",
  "password": "contraseña_segura123"
}
```

---

### 🔄 Refrescar Token
**Endpoint:** `POST /api/usuarios/refresh/`

**Descripción:** Genera un nuevo token de acceso usando el refresh token.

**Body (JSON):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```
---

## 📋 Registros de Actividades `/api/registros/`

### 📑 Listar Registros
**Endpoint:** `GET /api/registros/`

**Descripción:** Obtiene la lista completa de registros.

---

### ➕ Crear Registro
**Endpoint:** `POST /api/registros/`

**Descripción:** Inscribe un usuario en una comisión.

**Body (JSON):**
```json
{
  "usuario": 5,
  "comision": 3
}
```

**Campos requeridos:** `usuario`, `comision`

---

### 🔍 Ver Registro Específico
**Endpoint:** `GET /api/registros/{id}/`

**Descripción:** Obtiene los detalles de un registro específico.

**Ejemplo:** `GET /api/registros/1/`


---

### ✏️ Actualizar Registro Completo
**Endpoint:** `PUT /api/registros/{id}/`

**Descripción:** Actualiza todos los campos del registro.

**Body (JSON):**
```json
{
  "usuario": 5,
  "comision": 4
}
```

---

### 📝 Actualizar Registro Parcial
**Endpoint:** `PATCH /api/registros/{id}/`

**Descripción:** Actualiza uno o más campos del registro.

**Body (JSON):**
```json
{
  "comision": 4
}
```

---

### ❌ Eliminar Registro
**Endpoint:** `DELETE /api/registros/{id}/`

**Descripción:** Elimina un registro de inscripción.


---

## 👨‍🏫 Profesores `/api/profesores/`

### 📑 Listar Profesores
**Endpoint:** `GET /api/profesores/`

**Descripción:** Obtiene la lista completa de profesores.


---

### ➕ Crear Profesor
**Endpoint:** `POST /api/profesores/`

**Descripción:** Registra un nuevo profesor en el sistema.

**Body (JSON):**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",  // Opcional
  "telefono": "351-7654321"  // Opcional
}
```

**Campos requeridos:** `nombre`, `apellido`

---

### 🔍 Ver Profesor Específico
**Endpoint:** `GET /api/profesores/{id}/`

**Descripción:** Obtiene los detalles de un profesor específico.

**Ejemplo:** `GET /api/profesores/1/`


---

### ✏️ Actualizar Profesor Completo
**Endpoint:** `PUT /api/profesores/{id}/`

**Descripción:** Actualiza todos los campos del profesor.

**Body (JSON):**
```json
{
  "nombre": "María Eugenia",
  "apellido": "González López",
  "email": "maria.gonzalez@example.com",
  "telefono": "351-1234567"
}
```

---

### 📝 Actualizar Profesor Parcial
**Endpoint:** `PATCH /api/profesores/{id}/`

**Descripción:** Actualiza uno o más campos del profesor.

**Body (JSON):**
```json
{
  "telefono": "351-9999999"
}
```

---

### ❌ Eliminar Profesor
**Endpoint:** `DELETE /api/profesores/{id}/`

**Descripción:** Elimina un profesor del sistema.


## 🗓️ Comisiones `/api/comisiones/`
### 📑 Listar Comisiones
**Endpoint:** `GET /api/comisiones/`

**Descripción:** Obtiene la lista completa de comisiones, mostrando la actividad, el profesor, el cupo, el horario y la duración.

--- 

### ➕ Crear Comisión
**Endpoint:** `POST /api/comisiones/`

**Descripción:** Crea una nueva comisión. Requiere los IDs de profesor y actividad.

**Body (JSON):**

```json

{
  "profesor": 1, 
  "actividad": 2,
  "cupo": 18,
  "horario": "19:30:00",
  "duracion": "01:15:00"
}
```
**Campos requeridos:** profesor (ID), actividad (ID), cupo, horario, duracion

---


### 🔍 Ver Comisión Específica
**Endpoint:** `GET /api/comisiones/{id}/`

**Descripción:** Obtiene los detalles de una comisión específica.

**Ejemplo:** `GET /api/comisiones/3/`

---

### ✏️ Actualizar Comisión Completa
**Endpoint:** `PUT /api/comisiones/{id}/`

**Descripción:** Actualiza todos los campos de una comisión.

**Body (JSON):**

```json

{
  "profesor": 1, 
  "actividad": 2,
  "cupo": 20,
  "horario": "19:30:00",
  "duracion": "01:30:00"
}
```

---

### 📝 Actualizar Comisión Parcial
**Endpoint:** `PATCH /api/comisiones/{id}/`

**Descripción:** Actualiza uno o más campos de la comisión.

**Body (JSON):**

```json

{
  "cupo": 25,
  "horario": "20:00:00"
}
```

---

### ❌ Eliminar Comisión
**Endpoint:** `DELETE /api/comisiones/{id}/`

**Descripción:** Elimina una comisión del sistema.


## 🤸‍♀️ Actividades `/api/actividades/`
### 📑 Listar Actividades
**Endpoint:** `GET /api/actividades/`

**Descripción:** Obtiene la lista completa de actividades disponibles.

---


### ➕ Crear Actividad
**Endpoint:** `POST /api/actividades/`

**Descripción:** Crea una nueva actividad en el sistema.

**Body (JSON):**

```json

{
  "nombre": "Funcional",
  "descripcion": "Entrenamiento de alta intensidad." // Opcional
}
```

**Campos requeridos:** nombre


---

### 🔍 Ver Actividad Específica
**Endpoint:** `GET /api/actividades/{id}/`

**Descripción:** Obtiene los detalles de una actividad específica.

**Ejemplo:** `GET /api/actividades/1/`

---

### ✏️ Actualizar Actividad Completa
**Endpoint:** `PUT /api/actividades/{id}/`

**Descripción:** Actualiza todos los campos de la actividad.

**Body (JSON):**

```json

{
  "nombre": "Yoga Terapéutico",
  "descripcion": "Yoga enfocado en la recuperación de lesiones y el bienestar postural."
}
```

---


### 📝 Actualizar Actividad Parcial
**Endpoint:** `PATCH /api/actividades/{id}/`

**Descripción:** Actualiza uno o más campos de la actividad.

**Body (JSON):**

```json

{
  "descripcion": "Clases de yoga dinámico para todos los niveles."
}

```

---


### ❌ Eliminar Actividad
**Endpoint:** `DELETE /api/actividades/{id}/`

**Descripción:** Elimina una actividad del sistema.