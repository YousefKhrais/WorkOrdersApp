import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import WorkOrder from 'src/app/models/WorkOrder';
import { WorkOrdersService } from 'src/app/services/work-orders.service';

@Component({
  selector: 'app-work-orders-details',
  templateUrl: './work-orders-details.component.html',
  styleUrls: ['./work-orders-details.component.css']
})
export class WorkOrdersDetailsComponent implements OnInit {

  active = 1;
  workOrder!: WorkOrder;

  constructor(private workOrdersService: WorkOrdersService, private notificationService: NzNotificationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.route.paramMap.subscribe((params) => {
      let orderId = params.get('orderId')!;

      this.workOrdersService.getWorkOrderById(+orderId).subscribe((workOrder) => {
        if (workOrder) {
          this.workOrder = workOrder;
          console.log("this.workOrder ", this.workOrder);
        } else {
          this.notificationService.error("Error", "Work order not found!");
        }
      });
    });
  }
}