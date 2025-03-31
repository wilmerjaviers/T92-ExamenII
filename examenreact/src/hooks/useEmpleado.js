import { useState, useCallback } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";

const useEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const url = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

  const getEmpleados = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setEmpleados(response.data);
    } catch (error) {
      alertaError("Error al cargar los empleados");
      console.error(error);
    }
  }, []);

  const openModal = () => {
    setNombre('');
    setDni('');
    setDireccion('');
    setEmail('');
    setTitleModal('Registrar Empleado');
  };

  const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
    try {
      let obj = {
        method: metodo,
        url: urlApi,
        data: parametros,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };

      await axios(obj);
      alertaSuccess('Se guardó el empleado correctamente');
      document.getElementById('btnCerrarModal').click();
      getEmpleados();
    } catch (error) {
      alertaError(error.response?.data?.message || "Error al guardar el empleado");
    }
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const guardarEmpleado = () => {
    if (nombre === '') {
      alertaWarning('Nombre del empleado en blanco', 'nombre');
      return;
    } 
    if (dni === '') {
      alertaWarning('DNI del empleado en blanco', 'dni');
      return;
    }
  
    if (direccion === '') {
      alertaWarning('Dirección del empleado en blanco', 'direccion');
      return;
    }
    if (email === '') {
      alertaWarning('Email del empleado en blanco', 'email');
      return;
    }
    if (!validarEmail(email)) {
      alertaWarning('Email inválido', 'email');
      return;
    }

    const payload = {
      nombre: nombre,
      dni: dni,
      direccion: direccion,
      email: email
    };

    enviarSolicitud(url, 'POST', payload);
  };

  return {
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
  };
};

export default useEmpleado;