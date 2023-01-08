import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/models/User';
import WorkOrder from 'src/app/models/WorkOrder';
import WorkOrderDetailsIteam from 'src/app/models/WorkOrderDetails';
import Location from 'src/app/models/location';
import { AuthService } from 'src/app/services/auth.service';
import { LocationsService } from 'src/app/services/locations.service';
import { WorkOrdersService } from 'src/app/services/work-orders.service';

@Component({
  selector: 'app-work-order-details-table',
  templateUrl: './work-order-details-table.component.html',
  styleUrls: ['./work-order-details-table.component.css']
})
export class WorkOrderDetailsTableComponent implements OnInit {

  @Input() workOrder!: WorkOrder;
  locations: Location[] = [];

  addWorkOrderItemForm!: FormGroup;
  updateWorkOrderItemForm!: FormGroup;

  isCreateModalVisable = false;
  isUpdateModalVisable = false;

  isLoading = true;
  isOkLoading = false;

  selectedWorkOrderItem!: WorkOrderDetailsIteam;

  constructor(
    private workOrdersService: WorkOrdersService,
    private modalService: NzModalService,
    private locationsService: LocationsService,
    private notificationService: NzNotificationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.addWorkOrderItemForm = new FormGroup({
      description: new FormControl('', [Validators.required,]),
      location: new FormControl([Validators.required]),
    });

    this.updateWorkOrderItemForm = new FormGroup({
      progress: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    });

    this.locations = this.locationsService.getLocations();
  }

  showCreateModal() {
    this.isCreateModalVisable = true;
  }

  showUpdateModal(workOrderItem: WorkOrderDetailsIteam) {
    console.log("onupdate: " + workOrderItem);
    this.selectedWorkOrderItem = workOrderItem;
    this.isUpdateModalVisable = true;
  }

  onCancelCreateModal(): void {
    this.isCreateModalVisable = false;
  }

  onCancelUpdateModal(): void {
    this.isUpdateModalVisable = false;
  }

  showConfirmDeleteDialog(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this Work Order?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteWorkOrder(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel ' + id)
    });
  }

  onCreateItem(): void {
    this.isOkLoading = true;

    console.log(this.addWorkOrderItemForm.value);

    this.workOrdersService.addWorkOrderItem(this.workOrder.id, this.addWorkOrderItemForm.value).subscribe({
      next: (data) => {
        this.isCreateModalVisable = false;
        this.isOkLoading = false;

        this.notificationService.success('Success', 'Work Order Item created successfully');

        this.addWorkOrderItemForm.reset();
        if (data) {
          this.workOrder = data;
        }
      },
      error: (error) => {
        this.isCreateModalVisable = false;
        this.isOkLoading = false;
        this.notificationService.error('Error while creating Work Order Item', error.message);
      },
    });

  }

  onUpdateItem(): void {
    this.isOkLoading = true;

    console.log("beforeonupdate: " + this.workOrder, this.selectedWorkOrderItem,
      this.updateWorkOrderItemForm.controls['progress'].value);

    this.workOrdersService.updateWorkOrderItem(this.workOrder, this.selectedWorkOrderItem,
      this.updateWorkOrderItemForm.controls['progress'].value).subscribe({
        next: (data) => {
          this.isUpdateModalVisable = false;
          this.isOkLoading = false;

          console.log("onupdate: " + data);

          this.workOrder = data;
          this.notificationService.success('Success', 'Work Order Item progress updated successfully');
        },
        error: (error) => {
          this.isUpdateModalVisable = false;
          this.isOkLoading = false;

          this.notificationService.error('Error while updating Work Order Item progress', error.message);
        }
      });
  }

  deleteWorkOrder(id: number): void {
    this.workOrdersService.deleteWorkOrderItem(this.workOrder, id).subscribe({
      next: (data) => {
        this.notificationService.success('Success', 'Work Order Item deleted successfully');
        this.workOrder = data;
      },
      error: (error) => {
        this.notificationService.error('Error while deleted Work Order Item', error.message);
      },
    });
  }



  isReadOnly() {
    return this.authService.currentUser!.role === Role.Foremen;
  }
}
