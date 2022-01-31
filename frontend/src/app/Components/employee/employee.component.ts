import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/appModels/employee.model';
import { EmployeeService } from 'src/app/appServices/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  name : string;
  position : string;
  dept : string;
  employeesform : FormGroup;
  employee : Employee[];
  editModal : boolean = false ;

  constructor(private fb : FormBuilder , private empService : EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

    this.employeesform = this.fb.group({
      _id : [''],
      name : ['', Validators.required],
      position : ['', Validators.required],
      dept : ['']
    });
  }

  getEmployees(){
    this.empService.getEmployeelist().subscribe((res : Employee[]) => {
      console.log(res);

      this.employee = res;
    });
  }

  employeedata(){
    if(this.employeesform.valid){
      if(this.editModal == true){
        this.empService.updateEmployee(this.employeesform.value).subscribe(
          (res) => {
            console.log('add emp res:'+res);
            this.getEmployees();
          },
          (err) => {
            console.log('add emp err:'+err);
          }
        );
      }else{  
        console.log(this.employeesform.value);
        this.empService.addEmployee(this.employeesform.value).subscribe(
          (res) => {
            console.log('add emp res:'+res);
            this.getEmployees();
          },
          (err) => {
            console.log('add emp err:'+err);
          }
        );
      }
      this.employeesform.reset();
      this.editModal = false;
      console.log(this.editModal);
    }
  }

  editEmployee(emp){
    console.log(emp);
    this.editModal = true;
    this.employeesform.patchValue(emp);
  }

  deleteEmployees(id){
    if(confirm("Do You Really Want To Delete This Employee ?")){
      this.empService.deleteEmployee(id).subscribe(
        (res) => {
          console.log('Deleted Successfully'+res);
          this.getEmployees();
        },
        (err) => {
          console.log('delete emp err:'+err);
        }
      );
    }
  }

  editmodaloff(){
    this.editModal = false;
    console.log(this.editModal);
  }

}
