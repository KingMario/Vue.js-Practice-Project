import {subclasses, reFlightCode} from './flightInfoConsts'
import isValid from 'date-fns/is_valid'
import differenceInMinutes from 'date-fns/difference_in_minutes'

exports.addLeadingZero = (val) => {
  return (100 + val).toString().substr(1)
}

exports.flightInfoValidator = (flights) => {
  for (let flight of flights) {
    if (!flight.flightCode || !flight.departInfo || !flight.arriveInfo || !flight.subclass) { // missed required fields
      return false
    }
    if (!reFlightCode.test(flight.flightCode) || flight.sharedFlightCode && !reFlightCode.test(flight.sharedFlightCode)) { // invalid flightCode
      return false
    }
    if (!isValid(new Date(flight.departInfo.time)) || !isValid(new Date(flight.arriveInfo.time))) { // invalid time
      return false
    }
    if (!subclasses.hasOwnProperty(flight.subclass)) { // invalid subclass
      return false
    }
  }
  return true
}

exports.getDuration = (time1, time2) => {
  var minutes = differenceInMinutes(time2, time1)
  var hours = Math.floor(minutes / 60)
  minutes = minutes % 60
  return hours + 'h' + exports.addLeadingZero(minutes) + 'm'
}
