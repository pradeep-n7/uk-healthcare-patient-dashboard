import { useState } from 'react';
import {
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Bell,
  User,
  X,
  Clock,
  CheckCircle,
} from 'lucide-react';

const appointments = [
  {
    doctor: 'Dr. Sarah Wilson',
    type: 'General Consultation',
    date: '20 Sep 2026',
    time: '10:30 AM',
  },
  {
    doctor: 'Dr. James Carter',
    type: 'Follow-up',
    date: '28 Sep 2026',
    time: '02:00 PM',
  },
];

const activities = [
  'Prescription updated',
  'Appointment confirmed',
  'Medical record added',
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<'dashboard' | 'appointments'>('dashboard');

  const [booking, setBooking] = useState({
    type: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [booked, setBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const navigate = (target: 'dashboard' | 'appointments') => {
    setPage(target);
    setOpen(false);
  };

  return (
    <div className="app">
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <div className="brand-mark">+</div>
          <div>
            <strong>UK Healthcare</strong>
            <span>Patient Portal</span>
          </div>

          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav>
          <a
            className={page === 'dashboard' ? 'active' : ''}
            onClick={() => navigate('dashboard')}
          >
            <LayoutDashboard />
            Dashboard
          </a>

          <a
            className={page === 'appointments' ? 'active' : ''}
            onClick={() => navigate('appointments')}
          >
            <CalendarDays />
            Appointments
          </a>

          <a>
            <FileText />
            Medical Records
          </a>

          <a>
            <User />
            Profile
          </a>
        </nav>

        <a className="logout">
          <LogOut />
          Logout
        </a>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(true)}>
            <Menu />
          </button>

          <div>
            <h1>
              {page === 'dashboard'
                ? 'Patient Dashboard'
                : 'Appointments'}
            </h1>

            <p>
              {page === 'dashboard'
                ? 'Welcome back, Demo'
                : 'Manage your healthcare appointments'}
            </p>
          </div>

          <button className="notification">
            <Bell />
            <span>2</span>
          </button>
        </header>

        <section className="content">
          <div className="notice">
            Demo data only • no real patient records
          </div>

          {page === 'dashboard' ? (
            <>
              <section className="patient-card">
                <div className="avatar">AP</div>

                <div>
                  <h2>Demo</h2>
                  <p>Patient ID: DEMO-10245</p>

                  <div className="details">
                    <span>Date of Birth: 01 January 1998</span>
                    <span>Email: demo@example.com</span>
                  </div>
                </div>
              </section>

              <section className="kpis">
                <article className="kpi">
                  <CalendarDays />
                  <div>
                    <span>Upcoming Appointments</span>
                    <strong>2</strong>
                  </div>
                </article>

                <article className="kpi">
                  <FileText />
                  <div>
                    <span>Medical Records</span>
                    <strong>8</strong>
                  </div>
                </article>

                <article className="kpi">
                  <ClipboardList />
                  <div>
                    <span>Prescriptions</span>
                    <strong>3</strong>
                  </div>
                </article>

                <article className="kpi">
                  <Bell />
                  <div>
                    <span>Notifications</span>
                    <strong>2</strong>
                  </div>
                </article>
              </section>

              <div className="grid">
                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Upcoming Appointments</h2>
                      <p>Your next scheduled visits</p>
                    </div>

                    <button onClick={() => navigate('appointments')}>
                      View all
                    </button>
                  </div>

                  {appointments.map((a) => (
                    <div className="appointment" key={a.doctor}>
                      <div className="date-box">
                        <strong>{a.date.split(' ')[0]}</strong>
                        <span>{a.date.split(' ')[1]}</span>
                      </div>

                      <div className="appointment-info">
                        <strong>{a.doctor}</strong>
                        <span>
                          {a.type} • {a.time}
                        </span>
                      </div>

                      <span className="status">Confirmed</span>
                    </div>
                  ))}
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Recent Activity</h2>
                      <p>Latest updates</p>
                    </div>
                  </div>

                  {activities.map((a, i) => (
                    <div className="activity-row" key={a}>
                      <div className="dot">{i + 1}</div>

                      <div>
                        <strong>{a}</strong>
                        <span>
                          {i === 0 ? 'Today' : `${i + 1} days ago`}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </>
          ) : (
            <>
              <section className="booking-layout">
                <section className="panel booking-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Book an Appointment</h2>
                      <p>Choose a service, provider and convenient time</p>
                    </div>
                  </div>

                  {booked && (
                    <div className="success-message">
                      <CheckCircle size={20} />
                      Appointment request submitted successfully.
                    </div>
                  )}

                  <form onSubmit={handleBooking}>
                    <div className="form-grid">
                      <label>
                        Appointment Type
                        <select
                          value={booking.type}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              type: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select appointment type</option>
                          <option>General Consultation</option>
                          <option>Follow-up</option>
                          <option>Specialist Consultation</option>
                          <option>Health Check-up</option>
                        </select>
                      </label>

                      <label>
                        Healthcare Provider
                        <select
                          value={booking.doctor}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              doctor: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select provider</option>
                          <option>Dr. Sarah Wilson</option>
                          <option>Dr. James Carter</option>
                          <option>Dr. Emily Brown</option>
                        </select>
                      </label>

                      <label>
                        Preferred Date
                        <input
                          type="date"
                          value={booking.date}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              date: e.target.value,
                            })
                          }
                          required
                        />
                      </label>

                      <label>
                        Available Time
                        <select
                          value={booking.time}
                          onChange={(e) =>
                            setBooking({
                              ...booking,
                              time: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select time</option>
                          <option>09:00 AM</option>
                          <option>10:30 AM</option>
                          <option>12:00 PM</option>
                          <option>02:00 PM</option>
                          <option>03:30 PM</option>
                        </select>
                      </label>
                    </div>

                    <label className="full-field">
                      Reason for Visit
                      <textarea
                        placeholder="Briefly describe the reason for your appointment"
                        value={booking.reason}
                        onChange={(e) =>
                          setBooking({
                            ...booking,
                            reason: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    </label>

                    <button className="primary-btn" type="submit">
                      <CalendarDays size={18} />
                      Book Appointment
                    </button>
                  </form>
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Appointment Information</h2>
                      <p>Before you book</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Clock />
                    <div>
                      <strong>Available Times</strong>
                      <span>
                        Select from the available appointment slots.
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <CheckCircle />
                    <div>
                      <strong>Confirmation</strong>
                      <span>
                        Your booking request will show a confirmation message.
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <CalendarDays />
                    <div>
                      <strong>Upcoming Visits</strong>
                      <span>
                        Your scheduled appointments are shown below.
                      </span>
                    </div>
                  </div>
                </section>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h2>Upcoming Appointments</h2>
                    <p>Your scheduled visits</p>
                  </div>
                </div>

                {appointments.map((a) => (
                  <div className="appointment" key={a.doctor}>
                    <div className="date-box">
                      <strong>{a.date.split(' ')[0]}</strong>
                      <span>{a.date.split(' ')[1]}</span>
                    </div>

                    <div className="appointment-info">
                      <strong>{a.doctor}</strong>
                      <span>
                        {a.type} • {a.time}
                      </span>
                    </div>

                    <span className="status">Confirmed</span>
                  </div>
                ))}
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}