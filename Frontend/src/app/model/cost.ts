import { Car } from "./car";
import { CostType } from "./costtype";

export class Cost {
    id!: number;
    type!: CostType;
    car!: Car;
    price!: number;
    mileage!: number;
    note!: string;
    date!: Date;
    title!: string;
}
