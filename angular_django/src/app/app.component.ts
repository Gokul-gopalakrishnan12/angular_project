import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_django';
  name:string="";
  adress:string="";
  fee:number=0;
  studentarray:any[]=[];
  currentstudentid='';
  

  saverecords(){
    let bodydata={
      'name':this.name,
      "adress":this.adress,
      "fee":this.fee
    }
  
this.http.post('http://127.0.0.1:8000/task',bodydata).subscribe((resultData:any)=>{
  console.log(resultData);
  alert("student registration successful")
  
})
  }
getallstudent(){
  console.log("here but")
  this.http.get('http://127.0.0.1:8000/view').subscribe((resultData:any)=>{
  console.log(resultData)
  this.studentarray=resultData;
  console.log("here i am")
  console.log(this.studentarray)
  })
}

constructor(private http:HttpClient){
  this.getallstudent();
}
setdelete(data:any){this.http.delete(" http://127.0.0.1:8000/delete"+"/"+data.id).subscribe((resultData:any)=>{
  console.log(resultData);
  alert("studentdeleted")
  this.getallstudent();})}

setupdate(data:any){
  this.name=data.name;
  this.adress=data.adress;
  this.fee=data.fee;
  this.currentstudentid=data.id

}
setupdaterecords(){
  let bodydata={
    "name":this.name,
    "adress":this.adress,
    "fee":this.fee

  }
  this.http.put('http://127.0.0.1:8000/update/'+this.currentstudentid,bodydata).subscribe((resultData:any)=>{
    console.log(resultData);
    alert("student registration updated");
    this.name="";
    this.adress="";
    this.fee=0;
    this.getallstudent();
  })
}

}