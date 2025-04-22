import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../css/usuario_estilo/estilo_perfil.css';
import Actualizarperfil from '../../data-icono/usuario/Actualizar tu Perfil.png';

const countryOptions = [
  { value: '+1', label: '🇺🇸 USA (+1)' },
  { value: '+52', label: '🇲🇽 México (+52)' },
  { value: '+593', label: '🇪🇨 Ecuador (+593)' }
];

const initialProfileState = {
  id: '',
  ruc: '',
  razonSocial: '',
  direccionMatriz: '',
  abreviatura: '',
  telefono: '',
  phoneCode: '',
  phoneNumber: '',
  email: '',
  nombreBD: '',
  nombreDominio: '',
  tipoNegocio: {
    id: '',
    nombre: ''
  },
  deleted: false,
};

function PerfilActualizar() {
  const [profile, setProfile] = useState(initialProfileState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // TODO: La URL de la API debería ser dinámica y depender del ID del usuario obtenido del login.
  const API_URL = 'https://aadministracion.infor-business.com/api/1.0/Compania/0c127af1-56dd-453c-bf2a-b0712b331f41';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al obtener los datos: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        const telefono = data.telefono || '';
        let phoneCode = '';
        let phoneNumber = telefono;

        countryOptions.forEach(option => {
          if (telefono.startsWith(option.value)) {
            phoneCode = option.value;
            phoneNumber = telefono.replace(option.value, '');
          }
        });

        setProfile({
          ...data,
          phoneCode,
          phoneNumber
        });

      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [API_URL]); // Dependencia agregada para que se vuelva a ejecutar si la URL cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneCodeChange = (selectedOption) => {
    setProfile(prev => ({
      ...prev,
      phoneCode: selectedOption?.value || ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const datosActualizados = {
        id: profile.id,
        ruc: profile.ruc,
        razonSocial: profile.razonSocial,
        direccionMatriz: profile.direccionMatriz,
        abreviatura: profile.abreviatura,
        telefono: profile.phoneCode + profile.phoneNumber,
        email: profile.email,
        nombreBD: profile.nombreBD,
        nombreDominio: profile.nombreDominio,
        tipoNegocio: {
          id: profile.tipoNegocio?.id
        },
        deleted: profile.deleted
      };

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al guardar: ${errorData.message || response.statusText}`);
      }

      setSuccess('¡Perfil actualizado exitosamente!');
    } catch (err) {
      console.error('Error al guardar los datos:', err);
      setError(`Error de conexión: ${err.message}`);
    }
  };

  return (
    <div className="profile-container">
      <h2>Actualizar Perfil</h2>
      <img src={Actualizarperfil} alt="Actualizar Perfil" className="profile-image" />

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Categoría de Negocio:</label>
          <input
            type="text"
            name="tipoNegocio.nombre"
            value={profile.tipoNegocio?.nombre || ''}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Nombre de la Empresa:</label>
          <input
            type="text"
            name="razonSocial"
            value={profile.razonSocial}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>RUC:</label>
          <input
            type="text"
            name="ruc"
            value={profile.ruc}
            onChange={handleChange}
            pattern="[A-Za-z0-9]{10,20}"
            title="RUC debe tener entre 10 y 20 caracteres alfanuméricos"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Código de País:</label>
            <Select
              options={countryOptions}
              onChange={handlePhoneCodeChange}
              value={countryOptions.find(option => option.value === profile.phoneCode)}
              placeholder="Seleccione..."
              classNamePrefix="react-select"
            />
          </div>

          <div className="form-group">
            <label>Número de Celular:</label>
            <input
              type="tel"
              className="n_celular" // Considera renombrar esta clase a algo más descriptivo
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              title="Ingrese su número de celular" // Agregando la propiedad title
            />
          </div>
        </div>

        <button type="submit" className="bt">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default PerfilActualizar;
