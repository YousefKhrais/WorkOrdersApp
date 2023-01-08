import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/models/User';
import WorkOrder from 'src/app/models/WorkOrder';
import { AuthService } from 'src/app/services/auth.service';
import { WorkOrdersService } from 'src/app/services/work-orders.service';

@Component({
  selector: 'app-work-orders-list',
  templateUrl: './work-orders-list.component.html',
  styleUrls: ['./work-orders-list.component.css']
})
export class WorkOrdersListComponent implements OnInit {

  workOrders: WorkOrder[] = [];

  addWorkOrderForm!: FormGroup;

  isVisible = false;
  isLoading = true;
  isOkLoading = false;

  constructor(
    private workOrdersService: WorkOrdersService,
    private notificationService: NzNotificationService,
    private modalService: NzModalService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.addWorkOrderForm = new FormGroup({
      operationDescription: new FormControl('', [Validators.required]),
      startDate: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      endDate: new FormControl('',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    });

    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.workOrdersService.getWorkOrders().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.workOrders = data;
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.error('Error while loading Work Orders', error.message);
      },
    });
  }

  deleteWorkOrder(id: number): void {
    this.workOrdersService.deleteWorkOrder(id).subscribe({
      next: (data) => {
        this.notificationService.success('Success', 'Work Order deleted successfully');
        this.loadData();
      },
      error: (error) => {
        this.notificationService.error('Error while deleted Work Order', error.message);
      },
    });
  }

  showModal() {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

    if (this.addWorkOrderForm.value.startDate > this.addWorkOrderForm.value.endDate) {
      this.notificationService.error('Error', 'Start Date must be before End Date');
      this.isOkLoading = false;
      return;
    }

    this.workOrdersService.addWorkOrder(this.addWorkOrderForm.value).subscribe({
      next: (data) => {
        this.isVisible = false;
        this.isOkLoading = false;

        this.notificationService.success('Success', 'Work Order added successfully');

        this.loadData();
      },
      error: (error) => {
        this.isVisible = false;
        this.isOkLoading = false;

        this.notificationService.error('Error', error.message);
      },
    });
  }

  handleCancel(): void {
    this.isVisible = false;
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

  isReadOnly(): boolean {
    return this.authService.currentUser!.role === Role.Foremen;
  }
}
