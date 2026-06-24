let students = JSON.parse(localStorage.getItem('students_v2') || '[]');
let attendance = JSON.parse(localStorage.getItem('attendance_v2') || '{}');

// Tab switch
function openTab(tabName){
  document.querySelectorAll('.tabcontent').forEach(t=>t.style.display='none');
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
  document.getElementById(tabName).style.display='block';
  event.target.classList.add('active');
  if(tabName==='students') loadStudents();
  if(tabName==='attendance') loadAttendanceTable();
}

// Student form slide
function toggleForm(){
  document.getElementById('studentForm').classList.toggle('show');
}

// Add new student
function addStudent(){
  let name=document.getElementById('stuName').value.trim();
  let father=document.getElementById('stuFather').value.trim();
  let cls=document.getElementById('stuClass').value.trim();
  if(!name) return alert('نام لکھنا ضروری ہے');
  students.push({name,father,cls});
  localStorage.setItem('students_v2', JSON.stringify(students));
  document.getElementById('stuName').value='';
  document.getElementById('stuFather').value='';
  document.getElementById('stuClass').value='';
  toggleForm();
  loadStudents();
}

// Load students table
function loadStudents(){
  let tbody=document.querySelector('#studentTable tbody');
  tbody.innerHTML='';
  students.forEach((s,i)=>{
    tbody.innerHTML+=`<tr><td>${i+1}</td><td>${s.name}</td><td>${s.father}</td><td>${s.cls}</td><td><button class="btn btn-danger" onclick="delStudent(${i})">X</button></td></tr>`;
  });
}

// Delete student
function delStudent(i){
  if(confirm('کیا آپ اس طالبعلم کو ڈیلیٹ کرنا چاہتے ہیں؟')){
    students.splice(i,1);
    localStorage.setItem('students_v2', JSON.stringify(students));
    loadStudents();
  }
}

// Load attendance table with dropdown
function loadAttendanceTable(){
  let tbody=document.querySelector('#attTable tbody');
  tbody.innerHTML='';
  students.forEach((s,i)=>{
    tbody.innerHTML+=`<tr><td>${i+1}</td><td>${s.name}</td><td><select id="att${i}"><option value="P">حاضر</option><option value="A">غیر حاضر</option></select></td></tr>`;
  });
}

// Save attendance
function saveAttendance(){
  let date=document.getElementById('attDate').value;
  let incharge=document.getElementById('classIncharge').value;
  let period=document.getElementById('period').value;
  if(!date) return alert('تاریخ سیلیکٹ کریں');
  let att={};
  students.forEach((s,i)=>{
    att[s.name]=document.getElementById('att'+i).value;
  });
  attendance[date+'_'+period]={date,incharge,period,data:att};
  localStorage.setItem('attendance_v2', JSON.stringify(attendance));
  alert('حاضری سیو ہو گئی ✅');
}

// Goshwara Report - پرانے والا فارمیٹ
function generateGoshwara(){
  let date=document.getElementById('reportDate').value;
  if(!date) return alert('تاریخ سیلیکٹ کریں');
  let html=`<h3>Goshwara Report - ${date}</h3><table><tr><th>#</th><th>نام</th><th>حاضری</th></tr>`;
  let count=
