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
  Save,
  AlertCircle,
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

  const [page, setPage] = useState<
    'dashboard' | 'appointments' | 'profile'
  >('dashboard');

  const [booking, setBooking] = useState({
    type: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [booked, setBooked] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Demo',
    lastName: 'Patient',
    dateOfBirth: '1998-01-01',
    email: 'demo@example.com',
    phone: '07123456789',
    address: '123 Healthcare Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    emergencyName: 'Alex Patient',
    emergencyPhone: '07987654321',
    emergencyRelationship: 'Family Member',
  });

  const [profileErrors, setProfileErrors] = useState<
    Record<string, string>
  >({});

  const [profileSaved, setProfileSaved] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const navigate = (
    target: 'dashboard' | 'appointments' | 'profile'
  ) => {
    setPage(target);
    setOpen(false);
    setProfileSaved(false);
  };

  const updateProfile = (
    field: keyof typeof profile,
    value: string
  ) => {
    setProfile({
      ...profile,
      [field]: value,
    });

    setProfileErrors({
      ...profileErrors,
      [field]: '',
    });

    setProfileSaved(false);
  };

  const validateProfile = () => {
    const errors: Record<string, string> = {};

    if (!profile.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }

    if (!profile.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }

    if (!profile.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required.';
    }

    if (!profile.email.trim()) {
      errors.email = 'Email is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
    ) {
      errors.email = 'Enter a valid email address.';
    }

    if (!profile.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[0-9+\s()-]{10,15}$/.test(profile.phone)) {
      errors.phone = 'Enter a valid phone number.';
    }

    if (!profile.address.trim()) {
      errors.address = 'Address is required.';
    }

    if (!profile.city.trim()) {
      errors.city = 'City is required.';
    }

    if (!profile.postcode.trim()) {
      errors.postcode = 'Postcode is required.';
    }

    if (!profile.emergencyName.trim()) {
      errors.emergencyName =
        'Emergency contact name is required.';
    }

    if (!profile.emergencyPhone.trim()) {
      errors.emergencyPhone =
        'Emergency contact phone is required.';
    } else if (
      !/^[0-9+\s()-]{10,15}$/.test(profile.emergencyPhone)
    ) {
      errors.emergencyPhone =
        'Enter a valid emergency contact number.';
    }

    if (!profile.emergencyRelationship.trim()) {
      errors.emergencyRelationship =
        'Relationship is required.';
    }

    setProfileErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateProfile()) {
      setProfileSaved(true);
    } else {
      setProfileSaved(false);
    }
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

          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
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

          <a
            className={page === 'profile' ? 'active' : ''}
            onClick={() => navigate('profile')}
          >
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
          <button
            className="menu-btn"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>

          <div>
            <h1>
              {page === 'dashboard'
                ? 'Patient Dashboard'
                : page === 'appointments'
                  ? 'Appointments'
                  : 'Patient Profile'}
            </h1>

            <p>
              {page === 'dashboard'
                ? 'Welcome back, Demo'
                : page === 'appointments'
                  ? 'Manage your healthcare appointments'
                  : 'View and update your personal information'}
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

          {/* DASHBOARD */}
          {page === 'dashboard' ? (
            <>
              <section className="patient-card">
                <div className="avatar">AP</div>

                <div>
                  <h2>Demo</h2>
                  <p>Patient ID: DEMO-10245</p>

                  <div className="details">
                    <span>
                      Date of Birth: 01 January 1998
                    </span>

                    <span>
                      Email: demo@example.com
                    </span>
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

                    <button
                      onClick={() =>
                        navigate('appointments')
                      }
                    >
                      View all
                    </button>
                  </div>

                  {appointments.map((a) => (
                    <div
                      className="appointment"
                      key={a.doctor}
                    >
                      <div className="date-box">
                        <strong>
                          {a.date.split(' ')[0]}
                        </strong>

                        <span>
                          {a.date.split(' ')[1]}
                        </span>
                      </div>

                      <div className="appointment-info">
                        <strong>{a.doctor}</strong>

                        <span>
                          {a.type} • {a.time}
                        </span>
                      </div>

                      <span className="status">
                        Confirmed
                      </span>
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
                    <div
                      className="activity-row"
                      key={a}
                    >
                      <div className="dot">
                        {i + 1}
                      </div>

                      <div>
                        <strong>{a}</strong>

                        <span>
                          {i === 0
                            ? 'Today'
                            : `${i + 1} days ago`}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </>
          ) : page === 'appointments' ? (
            /* APPOINTMENTS */
            <>
              <section className="booking-layout">
                <section className="panel booking-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Book an Appointment</h2>
                      <p>
                        Choose a service, provider and
                        convenient time
                      </p>
                    </div>
                  </div>

                  {booked && (
                    <div className="success-message">
                      <CheckCircle size={20} />
                      Appointment request submitted
                      successfully.
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
                          <option value="">
                            Select appointment type
                          </option>

                          <option>
                            General Consultation
                          </option>

                          <option>Follow-up</option>

                          <option>
                            Specialist Consultation
                          </option>

                          <option>
                            Health Check-up
                          </option>
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
                          <option value="">
                            Select provider
                          </option>

                          <option>
                            Dr. Sarah Wilson
                          </option>

                          <option>
                            Dr. James Carter
                          </option>

                          <option>
                            Dr. Emily Brown
                          </option>
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
                          <option value="">
                            Select time
                          </option>

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

                    <button
                      className="primary-btn"
                      type="submit"
                    >
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
                        Select from the available
                        appointment slots.
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <CheckCircle />

                    <div>
                      <strong>Confirmation</strong>

                      <span>
                        Your booking request will show
                        a confirmation message.
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <CalendarDays />

                    <div>
                      <strong>Upcoming Visits</strong>

                      <span>
                        Your scheduled appointments are
                        shown below.
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
                  <div
                    className="appointment"
                    key={a.doctor}
                  >
                    <div className="date-box">
                      <strong>
                        {a.date.split(' ')[0]}
                      </strong>

                      <span>
                        {a.date.split(' ')[1]}
                      </span>
                    </div>

                    <div className="appointment-info">
                      <strong>{a.doctor}</strong>

                      <span>
                        {a.type} • {a.time}
                      </span>
                    </div>

                    <span className="status">
                      Confirmed
                    </span>
                  </div>
                ))}
              </section>
            </>
          ) : (
            /* PATIENT PROFILE */
            <>
              <form
                className="profile-form"
                onSubmit={handleProfileSubmit}
              >
                {profileSaved && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    Patient profile updated successfully.
                  </div>
                )}

                {Object.keys(profileErrors).length > 0 && (
                  <div className="error-summary">
                    <AlertCircle size={20} />

                    <div>
                      <strong>
                        Please correct the highlighted
                        fields.
                      </strong>

                      <span>
                        All required information must be
                        completed before saving.
                      </span>
                    </div>
                  </div>
                )}

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Personal Information</h2>

                      <p>
                        Keep your personal details
                        up to date
                      </p>
                    </div>
                  </div>

                  <div className="profile-grid">
                    <div className="field">
                      <label htmlFor="firstName">
                        First Name *
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        value={profile.firstName}
                        onChange={(e) =>
                          updateProfile(
                            'firstName',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.firstName && (
                        <small className="field-error">
                          {profileErrors.firstName}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="lastName">
                        Last Name *
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        value={profile.lastName}
                        onChange={(e) =>
                          updateProfile(
                            'lastName',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.lastName && (
                        <small className="field-error">
                          {profileErrors.lastName}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="dateOfBirth">
                        Date of Birth *
                      </label>

                      <input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) =>
                          updateProfile(
                            'dateOfBirth',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.dateOfBirth && (
                        <small className="field-error">
                          {profileErrors.dateOfBirth}
                        </small>
                      )}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Contact Information</h2>

                      <p>
                        Your contact details for
                        communication
                      </p>
                    </div>
                  </div>

                  <div className="profile-grid">
                    <div className="field">
                      <label htmlFor="email">
                        Email Address *
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          updateProfile(
                            'email',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.email && (
                        <small className="field-error">
                          {profileErrors.email}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="phone">
                        Phone Number *
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          updateProfile(
                            'phone',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.phone && (
                        <small className="field-error">
                          {profileErrors.phone}
                        </small>
                      )}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Address</h2>

                      <p>
                        Your current residential
                        address
                      </p>
                    </div>
                  </div>

                  <div className="profile-grid">
                    <div className="field field-wide">
                      <label htmlFor="address">
                        Address *
                      </label>

                      <input
                        id="address"
                        type="text"
                        value={profile.address}
                        onChange={(e) =>
                          updateProfile(
                            'address',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.address && (
                        <small className="field-error">
                          {profileErrors.address}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="city">
                        City *
                      </label>

                      <input
                        id="city"
                        type="text"
                        value={profile.city}
                        onChange={(e) =>
                          updateProfile(
                            'city',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.city && (
                        <small className="field-error">
                          {profileErrors.city}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="postcode">
                        Postcode *
                      </label>

                      <input
                        id="postcode"
                        type="text"
                        value={profile.postcode}
                        onChange={(e) =>
                          updateProfile(
                            'postcode',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.postcode && (
                        <small className="field-error">
                          {profileErrors.postcode}
                        </small>
                      )}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Emergency Contact</h2>

                      <p>
                        Someone to contact in an
                        emergency
                      </p>
                    </div>
                  </div>

                  <div className="profile-grid">
                    <div className="field">
                      <label htmlFor="emergencyName">
                        Contact Name *
                      </label>

                      <input
                        id="emergencyName"
                        type="text"
                        value={profile.emergencyName}
                        onChange={(e) =>
                          updateProfile(
                            'emergencyName',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.emergencyName && (
                        <small className="field-error">
                          {profileErrors.emergencyName}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="emergencyPhone">
                        Contact Phone *
                      </label>

                      <input
                        id="emergencyPhone"
                        type="tel"
                        value={profile.emergencyPhone}
                        onChange={(e) =>
                          updateProfile(
                            'emergencyPhone',
                            e.target.value
                          )
                        }
                      />

                      {profileErrors.emergencyPhone && (
                        <small className="field-error">
                          {profileErrors.emergencyPhone}
                        </small>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="emergencyRelationship">
                        Relationship *
                      </label>

                      <select
                        id="emergencyRelationship"
                        value={
                          profile.emergencyRelationship
                        }
                        onChange={(e) =>
                          updateProfile(
                            'emergencyRelationship',
                            e.target.value
                          )
                        }
                      >
                        <option>
                          Family Member
                        </option>

                        <option>Parent</option>
                        <option>Spouse/Partner</option>
                        <option>Sibling</option>
                        <option>Friend</option>
                        <option>Other</option>
                      </select>

                      {profileErrors.emergencyRelationship && (
                        <small className="field-error">
                          {
                            profileErrors
                              .emergencyRelationship
                          }
                        </small>
                      )}
                    </div>
                  </div>
                </section>

                <div className="profile-actions">
                  <span>
                    * Required fields
                  </span>

                  <button
                    className="primary-btn"
                    type="submit"
                  >
                    <Save size={18} />
                    Save Profile
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
}