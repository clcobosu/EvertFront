import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  @Input() emp: any;
  EmployeeId = "";
  EmployeeName = "";
  EmployeeLastName = "";
  Department = "";
  EstadoCivil = "";
  DateOfJoining = "";
  DateOfBird = "";
  Brothers = "";
  PhotoFileName = "";
  PhotoFilePath = "";
  DepartmentList: any = [];
  xEstadoCivil: any = [];


  ngOnInit(): void {
    this.loadEmployeeList();
  }

  selectedTeam = '';

	onSelected(value:string): void {
		this.selectedTeam = value;
	}

  selectHermano='';

  onRadioChange(value: string) {
    this.selectHermano = value;
    console.log(this.selectHermano);

 }

loadEmployeeList() {

    // this.service.t().subscribe((data: any) => {

    //   this.EmployeeId = this.emp.EmployeeId;
    //   this.EmployeeName = this.emp.EmployeeName;
    //   this.Department = this.emp.Department;
    //   this.DateOfJoining = this.emp.DateOfJoining;
    //   this.PhotoFileName = this.emp.PhotoFileName;
    //   this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    // });

  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      EmployeeLastName: this.EmployeeLastName,
      EstadoCivil: this.selectedTeam,
      DateOfBird: this.DateOfBird,
      PhotoFileName: this.PhotoFileName
    };

   console.log(val);

    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });

  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      EmployeeLastName: this.EmployeeLastName,
      EstadoCivil: this.selectedTeam,
      DateOfBird: this.DateOfBird,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }


  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    })
  }
}
