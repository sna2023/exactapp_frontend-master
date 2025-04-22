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

  const API_URL = 'https://aadministracion.infor-business.com/api/1.0/Compania/7e6a7d77-6ac5-4e33-99be-60741e20856a';//se necesita lo que es login como {idUsuaro} 

  useEffect(() => {
    fetch(API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      // Dividir el número de teléfono en código y número
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
    })
    .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

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
      // Combinar código y número de teléfono
      const datosActualizados = {
        ...profile,
        telefono: profile.phoneCode + profile.phoneNumber
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
        setError(`Error al guardar: ${errorData.message || response.statusText}`);
        return;
      }

      setSuccess('¡Perfil actualizado exitosamente!');
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
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
              className="n_celular"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        

        <button type="submit" className="bt">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default PerfilActualizar;