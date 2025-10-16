
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    dni VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    sexo VARCHAR(10) NOT NULL,
    edad INTEGER,
    tipo VARCHAR(20) NOT NULL DEFAULT 'usuario',
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    password VARCHAR(128) NOT NULL,
    last_login TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    date_joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(254),
    telefono VARCHAR(50)
);

CREATE TABLE actividades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE comisiones (
    id SERIAL PRIMARY KEY,
    profesor_id INTEGER NOT NULL,
    actividad_id INTEGER NOT NULL,
    cupo INTEGER NOT NULL,
    horario TIME NOT NULL,
    duracion INTERVAL NOT NULL,
    CONSTRAINT fk_profesor FOREIGN KEY (profesor_id)
        REFERENCES profesores_profesor(id) ON DELETE CASCADE,
    CONSTRAINT fk_actividad FOREIGN KEY (actividad_id)
        REFERENCES actividades_actividad(id) ON DELETE CASCADE
);

CREATE TABLE registros (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    comision_id INTEGER NOT NULL,
    fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios_usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_comision FOREIGN KEY (comision_id)
        REFERENCES comisiones_comision(id) ON DELETE CASCADE,
    CONSTRAINT unique_usuario_comision UNIQUE (usuario_id, comision_id)
);

