import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/models/User';
import WorkOrder from 'src/app/models/WorkOrder';
import { AuthService } from 'src/app/services/auth.service';
import { WorkOrdersService } from 'src/app/services/work-orders.service';

@Component({
  selector: 'app-work-order-header-form',
  templateUrl: './work-order-header-form.component.html',
  styleUrls: ['./work-order-header-form.component.css']
})
export class WorkOrderHeaderFormComponent implements OnInit {

  @Input() workOrder!: WorkOrder;
  workOrderHeaderForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private notificationService: NzNotificationService, private workOrdersService: WorkOrdersService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.workOrderHeaderForm = new FormGroup({
      startDate: new FormControl({ value: this.datePipe.transform(this.workOrder.startDate, "yyyy-MM-dd"), disabled: this.isReadOnly() }, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      endDate: new FormControl({ value: this.datePipe.transform(this.workOrder.endDate, "yyyy-MM-dd"), disabled: this.isReadOnly() }, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      operationDescription: new FormControl({ value: this.workOrder.operationDescription, disabled: this.isReadOnly() }, [Validators.required, Validators.minLength(5)]),
    });
  }

  onSubmit() {
    if (this.workOrderHeaderForm.value.startDate > this.workOrderHeaderForm.value.endDate) {
      this.notificationService.error('Error while updating Work Order', 'Start date must be before end date');
      return;
    }

    this.workOrder.startDate = new Date(this.workOrderHeaderForm.value.startDate);
    this.workOrder.endDate = new Date(this.workOrderHeaderForm.value.endDate);
    this.workOrder.operationDescription = this.workOrderHeaderForm.value.operationDescription;

    this.workOrdersService.updateWorkOrder(this.workOrder).subscribe({
      next: (data) => {
        this.workOrder = data;
        this.notificationService.success('Work Order updated', 'Work Order updated successfully');
      },
      error: (error) => {
        this.notificationService.error('Error while updating Work Order', error.message);
      }
    });
  }

  isReadOnly() {
    return this.authService.currentUser!.role === Role.Foremen;
  }
}
