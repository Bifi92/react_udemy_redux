import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {MdFlightTakeoff} from 'react-icons/md'
import api from '../../services/api'
import './style.css'
import {useDispatch} from 'react-redux';
import { addReserveRequest } from '../../store/modules/reserve/actions';

export default function Home() {
  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);

  useEffect(()=>{
    async function loadApi(){
      const response = await api.get('trips');
      setTrips(response.data); 
    }
    loadApi();
  }, []);

  function handleAdd(id) {
    dispatch(addReserveRequest(id));
  }

  return (
    <div>
      <div className='box'>
        {trips.map(trip => 
          (
            <li key={trip.id}>
              <img src={trip.image} alt={trip.title}/>
              <strong>{trip.title}</strong>
              <span>Status: {trip.status ? 'Disponivel' : 'Indisponivel'}</span>
              <button
                type='button'
                onClick={()=> handleAdd(trip.id)}>
                  <div>
                    <MdFlightTakeoff size={16} color='#FFF'/>
                  </div>
                  <span>Solilcirar reserva</span>
                </button>
            </li>
          )
        )}
      </div>
    </div>
  );
}