import {User} from "./user.model";

export interface Pilot {
  pilotId: number;
  firstName: string;
  lastName: string;
  summary: string;
  user: User;
}
