export const addPassenger = ({dispatch}) => {
  dispatch('ADD_PASSENGER')
}

export const updatePassengerValidated = ({dispatch}, validated) => {
  dispatch('UPDATE_PASSENGER_VALIDATED', validated)
}

export const updatePassengerType = ({dispatch}, oldType, newType) => {
  dispatch('UPDATE_PASSENGER_TYPE', oldType, newType)
}

export const deletePassenger = ({dispatch}, passenger) => {
  dispatch('DELETE_PASSENGE', passenger)
}
