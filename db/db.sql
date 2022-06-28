USE tecnoalsa_server;

CREATE TABLE usuarios(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(180) NOT NULL,
	rut VARCHAR(180) NOT NULL UNIQUE,
    region VARCHAR(180) NULL,
    comuna VARCHAR(180) NULL,
    calle VARCHAR(180) NULL,
    numero VARCHAR(180) NULL UNIQUE,
    local_oficina VARCHAR(180) NULL,
    telefono VARCHAR(180) NULL UNIQUE,
    clave VARCHAR(180) NOT NULL,
	tipo_contrato VARCHAR(180) NULL,
    contrato TIMESTAMP(0) NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    adddate_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(90) NOT NULL UNIQUE,
    ruta VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	nombre,
    ruta,
    created_at,
    updated_at
)
VALUES(
	'ADMIN',
    '/inicio/cliente',
    '2022-06-24',
    '2022-06-24'
);

INSERT INTO roles(
	nombre,
    ruta,
    created_at,
    updated_at
)
VALUES(
	'USUARIO',
    '/inicio/cliente',
    '2022-06-24',
    '2022-06-24'
);

INSERT INTO roles(
	nombre,
    ruta,
    created_at,
    updated_at
)
VALUES(
	'CAJERO',
    '/inicio/cajero',
    '2022-06-24',
    '2022-06-24'
);

CREATE TABLE usuario_has_roles(
	id_usuario BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_usuario, id_rol)
);
