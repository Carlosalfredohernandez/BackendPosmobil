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