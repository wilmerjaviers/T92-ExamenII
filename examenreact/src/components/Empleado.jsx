import React, { useEffect } from 'react';
import Entrada from "./Entrada";
import useEmpleado from "../hooks/useEmpleado";

const Empleado = () => {
  const {
    empleados,
    getEmpleados,
    openModal,
    nombre,
    setNombre,
    dni,
    setDni,
    direccion,
    setDireccion,
    email,
    setEmail,
    titleModal,
    guardarEmpleado
  } = useEmpleado();

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Listado de Empleados</h1>
        </div>
      </div>
      
      <div className="row mt-3">
        <div className="col-md-4 offset-md-4">
          <div className="d-grid mx-auto">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEmpleado" onClick={() => openModal()}>
              <i className="fa-solid fa-user-plus"></i> Registrar Empleado
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-lg-8 offset-0 offset-lg-2">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Dirección</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {empleados.length > 0 ? (
                  empleados.map((empleado, i) => (
                    <tr key={empleado.id}>
                      <td>{i + 1}</td>
                      <td>{empleado.nombre}</td>
                      <td>{empleado.dni}</td>
                      <td>{empleado.direccion}</td>
                      <td>{empleado.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No hay empleados registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="modalEmpleado" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{titleModal}</h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
            </div>
            <div className="modal-body">
              <Entrada 
                idCampo="nombre" 
                iconName="fa-solid fa-user" 
                placeholderName="Nombre completo" 
                tipoCampo="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
              <Entrada 
                idCampo="dni" 
                iconName="fa-solid fa-id-card" 
                placeholderName="DNI" 
                tipoCampo="text" 
                value={dni} 
                onChange={(e) => setDni(e.target.value)} 
              />
              <Entrada 
                idCampo="direccion" 
                iconName="fa-solid fa-location-dot" 
                placeholderName="Dirección" 
                tipoCampo="text" 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} 
              />
              <Entrada 
                idCampo="email" 
                iconName="fa-solid fa-envelope" 
                placeholderName="Email" 
                tipoCampo="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={() => guardarEmpleado()}>
                <i className="fa-solid fa-floppy-disk"></i> Guardar
              </button>
              <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i> Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empleado;