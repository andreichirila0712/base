import {Pilot} from "./pilot.model";

export interface Flight {
  flightId: number;
  airlineName: string;
  fromLocation: string;
  toLocation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  totalSeats: number;
  pilotDTO: Pilot;
}
