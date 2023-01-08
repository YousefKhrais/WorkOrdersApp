import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import WorkOrder from '../models/WorkOrder';
import { formatDate } from '@angular/common';
import WorkOrderDetailsIteam from '../models/WorkOrderDetails';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private workOrders: WorkOrder[] = [];

  // Used Observable to minimize the code changes when impleminting HTTPClient in the future. (Requests to the backend server)
  constructor() { }

  // This function is used to get all the work orders from the server.
  getWorkOrders(): Observable<WorkOrder[]> {
    return new Observable<WorkOrder[]>(observer => {
      observer.next(this.workOrders);
    });
  }

  // This function is used to add a new work order to the server.
  // The function returns the new work order with the id and creation date and an initial progress of 0.
  addWorkOrder(workOrder: WorkOrder): Observable<WorkOrder[]> {
    return new Observable<WorkOrder[]>(observer => {
      workOrder.id = this.workOrders.length + 1;
      workOrder.creationDate = new Date();
      workOrder.progress = 0;
      workOrder.details = [];

      this.workOrders.push(workOrder);
      observer.next(this.workOrders);
    });
  }

  // This function is used to update a work order in the server.
  updateWorkOrder(workOrder: WorkOrder): Observable<WorkOrder> {
    return new Observable<WorkOrder>(observer => {
      let index = this.workOrders.findIndex(x => x.id == workOrder.id);
      this.workOrders[index] = workOrder;
      observer.next(workOrder);
    });
  }

  // This function is used to delete a work order from the server.
  // The function returns true if the work order was deleted successfully.
  deleteWorkOrder(id: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let index = this.workOrders.findIndex(x => x.id == id);
      this.workOrders.splice(index, 1);
      observer.next(true);
    });
  }

  // This function is used to get a work order from array by id.
  // The function returns the work order if it was found.
  getWorkOrderById(id: number): Observable<WorkOrder | undefined> {
    return new Observable<WorkOrder | undefined>(observer => {
      let workOrder = this.workOrders.find(x => x.id == id);
      observer.next(workOrder);
    });
  }

  // This function is used to add a new work order details item to a work order.
  // The function returns the work order with the new item.
  addWorkOrderItem(id: number, workOrderItem: WorkOrderDetailsIteam): Observable<WorkOrder | undefined> {
    return new Observable<WorkOrder | undefined>(observer => {
      let workOrder = this.workOrders.find(x => x.id == id);
      workOrder?.details.push(workOrderItem);
      observer.next(workOrder);
    });
  }

  // This function is used to update a work order details item in a work order.
  // The function returns the work order with the new item.
  updateWorkOrderItem(workOrder: WorkOrder, selectedWorkOrderItem: WorkOrderDetailsIteam, progress: number): Observable<WorkOrder> {
    return new Observable<WorkOrder>(observer => {
      let workOrderIndex = this.workOrders.findIndex(x => x.id == workOrder.id);
      let workOrderItemIndex = workOrder.details.findIndex(x => x.id == selectedWorkOrderItem.id);

      workOrder.details[workOrderItemIndex].progress = progress;
      this.workOrders[workOrderIndex] = workOrder;

      this.calculateWorkOrderProgress(workOrder);
      observer.next(workOrder);
    });
  }

  // This function is used to delete a work order details item from a work order.
  // The function returns the work order with the new item.
  deleteWorkOrderItem(workOrder: WorkOrder, id: number): Observable<WorkOrder> {
    return new Observable<WorkOrder>(observer => {
      let workOrderIndex = this.workOrders.findIndex(x => x.id == workOrder.id);
      let workOrderItemIndex = workOrder.details.findIndex(x => x.id == id);

      workOrder.details.splice(workOrderItemIndex, 1);
      this.workOrders[workOrderIndex] = workOrder;

      this.calculateWorkOrderProgress(workOrder);
      observer.next(workOrder);
    });
  }

  // This function is used to calculate the progress of a work order.
  // the progress is calculated by the average of the progress of all the work order details items.
  // The function returns the work order with the new progress.
  calculateWorkOrderProgress(workOrder: WorkOrder) {
    let workOrderIndex = this.workOrders.findIndex(x => x.id == workOrder.id);
    let progress = 0;
    workOrder.details.forEach(item => {
      progress += item.progress;
    });

    if (workOrder.details.length != 0) {
      workOrder.progress = progress / workOrder.details.length;
    } else {
      workOrder.progress = 0;
    }

    this.workOrders[workOrderIndex] = workOrder;
  }
}
