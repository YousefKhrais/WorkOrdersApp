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
      startDate: new FormControl(this.datePipe.transform(this.workOrder.startDate, "yyyy-MM-dd"), [Validators.required]),
      endDate: new FormControl(this.datePipe.transform(this.workOrder.endDate, "yyyy-MM-dd"), [Validators.required]),
      operationDescription: new FormControl(this.workOrder.operationDescription, [Validators.required, Validators.minLength(5)]),
    });
  }

  onSubmit() {
    this.workOrdersService.updateWorkOrder(this.workOrderHeaderForm.value).subscribe({
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
