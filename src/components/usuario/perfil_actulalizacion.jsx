import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../css/usuario_estilo/estilo_perfil.css';
import Actualizarperfil from '../../data-icono/usuario/Actualizar tu Perfil.png';
//
const countryOptions = [
  { value: '+1', label: '🇺🇸 USA (+1)' },
  { value: '+52', label: '🇲🇽 México (+52)' },
  { value: '+593', label: '🇪🇨 Ecuador (+593)' }
];

const initialProfileState = {
  usuario: {
    compania: {
      abreviatura: '',
      razonSocial: '',
      ruc: ''
    },
    phoneNumber: '',
    phoneCode: ''
  }
};

function PerfilActualizar() {
  const [profile, setProfile] = useState(initialProfileState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL_USUARIO = 'https://aadministracion.infor-business.com/api/1.0/Usuario';
  const API_URL_COMPANIA = 'https://aadministracion.infor-business.com/api/1.0/Compania';
  const USER_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUsuario = await fetch(`${API_URL_USUARIO}/${USER_ID}`);
        if (!responseUsuario.ok) throw new Error('Error al obtener datos del usuario');
        const resultUsuario = await responseUsuario.json();

        const responseCompania = await fetch(`${API_URL_COMPANIA}/${USER_ID}`);
        if (!responseCompania.ok) throw new Error('Error al obtener datos de la compañía');
        const resultCompania = await responseCompania.json();

        const phoneParts = typeof resultUsuario.phoneNumber === 'string' ? resultUsuario.phoneNumber.split(' ') : [];

        setProfile({
          ...resultUsuario,
          usuario: {
            ...resultUsuario,
            phoneCode: phoneParts[0] || '',
            phoneNumber: phoneParts.slice(1).join(' ') || '',
            compania: resultCompania || {
              abreviatura: '',
              razonSocial: '',
              ruc: ''
            }
          }
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      usuario: {
        ...prev.usuario,
        compania: {
          ...prev.usuario.compania,
          [name]: value
        }
      }
    }));
  };

  const handlePhoneChange = (e) => {
    setProfile(prev => ({
      ...prev,
      usuario: {
        ...prev.usuario,
        phoneNumber: e.target.value
      }
    }));
  };

  const handlePhoneCodeChange = (selectedOption) => {
    setProfile(prev => ({
      ...prev,
      usuario: {
        ...prev.usuario,
        phoneCode: selectedOption?.value || ''
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...profile,
        phoneNumber: `${profile.usuario.phoneCode} ${profile.usuario.phoneNumber}`.trim()
      };

      const response = await fetch(`${API_URL_USUARIO}/${USER_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la actualización');
      }

      setSuccess('¡Perfil actualizado correctamente!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="profile-container">Cargando...</div>;

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
            name="abreviatura"
            value={profile.usuario.compania.abreviatura}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nombre de la Empresa:</label>
          <input
            type="text"
            name="razonSocial"
            value={profile.usuario.compania.razonSocial}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>RUC:</label>
          <input
            type="text"
            name="ruc"
            value={profile.usuario.compania.ruc}
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
              value={countryOptions.find(opt => opt.value === profile.usuario.phoneCode)}
              placeholder="Seleccione..."
              classNamePrefix="react-select"
            />
          </div>

          <div className="form-group">
            <label>Número de Celular:</label>
            <input
              type="tel"
              className="n_celular"
              value={profile.usuario.phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
        </div>

        <button type="submit" className="bt">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default PerfilActualizar;
