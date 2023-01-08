import WorkOrderDetails from "./WorkOrderDetails";

export default class WorkOrder {
    id!: number;
    creationDate?: Date;
    operationDescription!: string;
    startDate!: Date;
    endDate!: Date;
    progress: number = 0;
    details: WorkOrderDetails[] = [];
}