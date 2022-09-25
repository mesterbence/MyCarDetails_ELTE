import { Cost } from "./cost";
import { FuelType } from "./fueltype";

export class Fueling {
    id!: number;
    cost!: Cost;
    quantity!: number;
    type!: FuelType;
    isPremium!: boolean;
}
