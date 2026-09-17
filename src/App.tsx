import {useState} from 'react';
import {CalendarDays,ClipboardList,FileText,LayoutDashboard,LogOut,Menu,Bell,User,X} from 'lucide-react';

const appointments=[
{doctor:'Dr. Sarah Wilson',type:'General Consultation',date:'20 Sep 2026',time:'10:30 AM'},
{doctor:'Dr. James Carter',type:'Follow-up',date:'28 Sep 2026',time:'02:00 PM'}
];
const activities=['Prescription updated','Appointment confirmed','Medical record added'];

export default function App(){
 const [open,setOpen]=useState(false);
 return <div className="app">
  <aside className={open?'sidebar open':'sidebar'}>
   <div className="brand"><div className="brand-mark">+</div><div><strong>UK Healthcare</strong><span>Patient Portal</span></div><button className="close-btn" onClick={()=>setOpen(false)}><X size={20}/></button></div>
   <nav><a className="active"><LayoutDashboard/> Dashboard</a><a><CalendarDays/> Appointments</a><a><FileText/> Medical Records</a><a><User/> Profile</a></nav>
   <a className="logout"><LogOut/> Logout</a>
  </aside>
  <main className="main">
   <header className="topbar"><button className="menu-btn" onClick={()=>setOpen(true)}><Menu/></button><div><h1>Patient Dashboard</h1><p>Welcome back, Demo</p></div><button className="notification"><Bell/><span>2</span></button></header>
   <section className="content">
    <div className="notice">Demo data only • no real patient records</div>
    <section className="patient-card"><div className="avatar">AP</div><div><h2>Demo</h2><p>Patient ID: DEMO-10245</p><div className="details"><span>Date of Birth: 01 January 1998</span><span>Email: demo@example.com</span></div></div></section>
    <section className="kpis">
     <article className="kpi"><CalendarDays/><div><span>Upcoming Appointments</span><strong>2</strong></div></article>
     <article className="kpi"><FileText/><div><span>Medical Records</span><strong>8</strong></div></article>
     <article className="kpi"><ClipboardList/><div><span>Prescriptions</span><strong>3</strong></div></article>
     <article className="kpi"><Bell/><div><span>Notifications</span><strong>2</strong></div></article>
    </section>
    <div className="grid">
     <section className="panel"><div className="panel-heading"><div><h2>Upcoming Appointments</h2><p>Your next scheduled visits</p></div><button>View all</button></div>
      {appointments.map(a=><div className="appointment" key={a.doctor}><div className="date-box"><strong>{a.date.split(' ')[0]}</strong><span>{a.date.split(' ')[1]}</span></div><div className="appointment-info"><strong>{a.doctor}</strong><span>{a.type} • {a.time}</span></div><span className="status">Confirmed</span></div>)}
     </section>
     <section className="panel"><div className="panel-heading"><div><h2>Recent Activity</h2><p>Latest updates</p></div></div>
      {activities.map((a,i)=><div className="activity-row" key={a}><div className="dot">{i+1}</div><div><strong>{a}</strong><span>{i===0?'Today':`${i+1} days ago`}</span></div></div>)}
     </section>
    </div>
   </section>
  </main>
 </div>
}