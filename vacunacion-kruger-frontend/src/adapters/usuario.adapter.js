export const createUsuarioAdapter = (usuario) => {
  return {
    id: usuario.id,
    rolId: usuario.rol.id,
    rolNombre: usuario.rol.nombre,
    cedula: usuario.cedula,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    email: usuario.email,
    fechaNacimiento: usuario.fecha_nacimiento,
    direccion: usuario.direccion,
    celular: usuario.celular,
    estadoVacunacion: usuario.estado_vacunacion
  };
};
