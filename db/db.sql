CREATE TABLE deportes (
    id_deporte INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE horarios (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_deporte INT NOT NULL,
    dia ENUM('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (id_deporte) REFERENCES deportes(id_deporte)
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(15) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    tel VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    sexo ENUM('M','F','Otro'),
    edad INT,
    tipo ENUM('socio','adm') DEFAULT 'socio'
);

CREATE TABLE registros (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_horario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_horario) REFERENCES horarios(id_horario)
);
