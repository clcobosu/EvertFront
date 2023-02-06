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
  EmployeeId: number= 0;
  EmployeeName = "";
  EmployeeLastName = "";
  Department ="";
  EstadoCivil: number = 0;
  DateOfBird : string= '';
  Brothers !: boolean;
  PhotoFileName : string = '';
  PhotoFilePath: string = '';
  DepartmentList:any= [];
  xEstadoCivil: any = [];



  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){

    var fetchedObject = JSON.parse(JSON.stringify(this.emp));
    this.EmployeeName = fetchedObject.EmployeeName.toString();
    this.EmployeeLastName = fetchedObject.EmployeeLastName.toString();
    this.EstadoCivil = fetchedObject.EstadoCivil.toString();
    this.DateOfBird = fetchedObject.DateOfBird.toString();

  }

  selectedTeam !:number ;

	onSelected(value:string): void {

    if(value==='Casado')
      this.selectedTeam=1;
    else
      this.selectedTeam=0;
	}

  selectHermano!:boolean;

  onRadioChange(value: string) {
    if(value==='true')
      this.selectHermano= true;
    else
      this.selectHermano=false;
 }


  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      EmployeeLastName: this.EmployeeLastName,
      EstadoCivil: this.selectedTeam,
      DateOfBird: this.DateOfBird,
      Brothers: this.selectHermano,
      PhotoFileName: this.PhotoFileName
    };

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
      Brothers: this.selectHermano,
      PhotoFileName: this.PhotoFileName
    };

    let msg = '';

    this.service.updateEmployee(val).subscribe(res => {
     msg=res;
    });

    alert(msg.toString());
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
