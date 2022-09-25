import { FuelType } from "./fueltype";
import { User } from "./user";

export class Car {
    id!: number;
    numberplate!: string;
    owner!: User;
    brand!: string;
    model!: string;
    fuelType!: FuelType;
}
