import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080";

function LoginPage({ onLogin, goToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      onLogin(await response.json());
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-icon">🎓</div>
          <div>
            <h2>PlaceMate</h2>
            <span>Placement Management System</span>
          </div>
        </div>

        <div className="login-message">
          <div className="login-badge">PLACEMENT MANAGEMENT SYSTEM</div>
          <h1>
            Manage placements.
            <br />
            Empower students.
          </h1>
          <p>
            A centralized platform to manage students, colleges, placements
            and certificates efficiently.
          </p>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-icon">🎓</div>
          <h1>Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to your placement management account
          </p>

          {error && <div className="login-error">⚠️ {error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In →"}
          </button>

          <div className="signup-link">
            <span>Don't have an account?</span>
            <button type="button" onClick={goToSignup}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignupPage({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("ADMIN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          password,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create account.");
      }

      setSuccess("Account created successfully.");

      setTimeout(() => {
        goToLogin();
      }, 1000);
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-icon">🎓</div>
          <div>
            <h2>PlaceMate</h2>
            <span>Placement Management System</span>
          </div>
        </div>

        <div className="login-message">
          <div className="login-badge">CREATE YOUR ACCOUNT</div>
          <h1>
            Join PlaceMate.
            <br />
            Manage placements.
          </h1>
          <p>Create an account and manage your placement information.</p>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleSignup}>
          <div className="login-icon">✨</div>
          <h1>Create Account</h1>

          {error && <div className="login-error">⚠️ {error}</div>}
          {success && <div className="login-success">✓ {success}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="STUDENT">STUDENT</option>
              <option value="COLLEGE">COLLEGE</option>
              <option value="CORPORATE">CORPORATE</option>
            </select>
          </div>

          <button className="login-button" type="submit">
            Create Account
          </button>

          <div className="signup-link">
            <span>Already have an account?</span>
            <button type="button" onClick={goToLogin}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ goToModule, allowedModules }) {
  const [counts, setCounts] = useState({
    students: 0,
    colleges: 0,
    placements: 0,
    certificates: 0,
  });
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API_URL}/students`),
          fetch(`${API_URL}/colleges`),
          fetch(`${API_URL}/placements`),
          fetch(`${API_URL}/certificates`),
        ]);

        const [students, colleges, placementData, certificates] =
          await Promise.all(
            responses.map(async (response) =>
              response.ok ? response.json() : []
            )
          );

        setCounts({
          students: Array.isArray(students) ? students.length : 0,
          colleges: Array.isArray(colleges) ? colleges.length : 0,
          placements: Array.isArray(placementData)
            ? placementData.length
            : 0,
          certificates: Array.isArray(certificates)
            ? certificates.length
            : 0,
        });

        setPlacements(
          Array.isArray(placementData) ? placementData : []
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = [
    {
      type: "students",
      icon: "🎓",
      title: "Students",
      count: counts.students,
      text: "Registered students",
    },
    {
      type: "colleges",
      icon: "🏫",
      title: "Colleges",
      count: counts.colleges,
      text: "Registered colleges",
    },
    {
      type: "placements",
      icon: "💼",
      title: "Placements",
      count: counts.placements,
      text: "Placement drives",
    },
    {
      type: "certificates",
      icon: "📜",
      title: "Certificates",
      count: counts.certificates,
      text: "Certificates issued",
    },
  ];

  const visibleCards = cards.filter((card) =>
    allowedModules.includes(card.type)
  );

  return (
    <>
      <div className="page-heading">
        <div className="heading-icon">📊</div>
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your placement management system.</p>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <>
          <div className="dashboard-grid">
            {visibleCards.map((card) => (
              <button
                className="dashboard-card"
                key={card.type}
                onClick={() => goToModule(card.type)}
              >
                <div className="dashboard-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <h1>{card.count}</h1>
                <p>{card.text}</p>
              </button>
            ))}
          </div>

          {allowedModules.includes("placements") && (
            <div className="table-panel">
              <div className="dashboard-section-header">
                <h2>Recent Placements</h2>
                <button
                  className="primary"
                  onClick={() => goToModule("placements")}
                >
                  View Placements
                </button>
              </div>

              {placements.length === 0 ? (
                <div className="empty">No placement records found.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>College</th>
                      <th>Date</th>
                      <th>Qualification</th>
                      <th>Year</th>
                    </tr>
                  </thead>

                  <tbody>
                    {placements
                      .slice(-5)
                      .reverse()
                      .map((placement) => (
                        <tr key={placement.id}>
                          <td>{placement.id}</td>
                          <td>{placement.name}</td>
                          <td>{placement.college?.collegeName || "-"}</td>
                          <td>{placement.date || "-"}</td>
                          <td>{placement.qualification || "-"}</td>
                          <td>{placement.year || "-"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

function ModulePage({ type }) {
  const details = {
    students: {
      icon: "🎓",
      title: "Students",
      singular: "Student",
      endpoint: "/students",
    },
    colleges: {
      icon: "🏫",
      title: "Colleges",
      singular: "College",
      endpoint: "/colleges",
    },
    placements: {
      icon: "💼",
      title: "Placements",
      singular: "Placement",
      endpoint: "/placements",
    },
    certificates: {
      icon: "📜",
      title: "Certificates",
      singular: "Certificate",
      endpoint: "/certificates",
    },
  };

  const info = details[type];

  const emptyForm = {
    name: "",
    roll: "",
    qualification: "",
    course: "",
    year: "",
    hallTicketNo: "",
    collegeName: "",
    location: "",
    date: "",
  };

  const [data, setData] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const request = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Request failed.");
    }

    if (response.status === 204) {
      return null;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  };

  const loadColleges = async () => {
    const result = await request(`${API_URL}/colleges`);
    const list = Array.isArray(result) ? result : [];
    setColleges(list);
    return list;
  };

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await request(`${API_URL}${info.endpoint}`);
      setData(Array.isArray(result) ? result : []);

      if (type === "placements" || type === "certificates") {
        await loadColleges();
      }
    } catch (err) {
      setData([]);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [type]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const openAdd = () => {
    setForm({ ...emptyForm });
    setEditMode(false);
    setSelectedId(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditMode(true);
    setSelectedId(item.id);
    setError("");

    if (type === "students") {
      setForm({
        ...emptyForm,
        name: item.name || "",
        roll: item.roll ?? "",
        qualification: item.qualification || "",
        course: item.course || "",
        year: item.year ?? "",
        hallTicketNo: item.hallTicketNo ?? "",
      });
    }

    if (type === "colleges") {
      setForm({
        ...emptyForm,
        collegeName: item.collegeName || "",
        location: item.location || "",
      });
    }

    if (type === "placements") {
      setForm({
        ...emptyForm,
        name: item.name || "",
        qualification: item.qualification || "",
        year: item.year ?? "",
        date: item.date || "",
        collegeName: item.college?.collegeName || "",
      });
    }

    if (type === "certificates") {
      setForm({
        ...emptyForm,
        year: item.year ?? "",
        collegeName: item.college?.collegeName || "",
      });
    }

    setShowModal(true);
  };

  const getCollegeId = async () => {
    const collegeName = form.collegeName.trim();

    if (!collegeName) {
      throw new Error("Please select or enter a college.");
    }

    const existing = colleges.find(
      (college) =>
        college.collegeName?.trim().toLowerCase() ===
        collegeName.toLowerCase()
    );

    if (existing) {
      return Number(existing.id);
    }

    const created = await request(`${API_URL}/colleges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collegeName: collegeName,
        location: "",
      }),
    });

    return Number(created.id);
  };

  const getRequestBody = async () => {
    if (type === "students") {
      return {
        name: form.name,
        roll: Number(form.roll),
        qualification: form.qualification,
        course: form.course,
        year: Number(form.year),
        hallTicketNo: Number(form.hallTicketNo),
      };
    }

    if (type === "colleges") {
      return {
        collegeName: form.collegeName,
        location: form.location,
      };
    }

    if (type === "placements") {
      const collegeId = await getCollegeId();

      return {
        name: form.name,
        qualification: form.qualification,
        year: Number(form.year),
        date: form.date,
        college: { id: collegeId },
      };
    }

    if (type === "certificates") {
      const collegeId = await getCollegeId();

      return {
        year: Number(form.year),
        college: { id: collegeId },
      };
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const body = await getRequestBody();

      const url = editMode
        ? `${API_URL}${info.endpoint}/${selectedId}`
        : `${API_URL}${info.endpoint}`;

      await request(url, {
        method: editMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setShowModal(false);
      await loadData();
    } catch (err) {
      setError(err.message || "Unable to save record.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      await request(`${API_URL}${info.endpoint}/${id}`, {
        method: "DELETE",
      });

      await loadData();
    } catch {
      alert("Unable to delete record.");
    }
  };

  const filteredData = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const CollegeField = () => (
    <div className="form-group">
      <label>College</label>

      <input
        name="collegeName"
        value={form.collegeName}
        onChange={handleChange}
        list="college-list"
        placeholder="Select or type college name"
        required
      />

      <datalist id="college-list">
        {colleges.map((college) => (
          <option key={college.id} value={college.collegeName} />
        ))}
      </datalist>

      <small>Select a registered college or type a new college name.</small>
    </div>
  );

  return (
    <>
      <div className="page-heading">
        <div className="heading-icon">{info.icon}</div>
        <div>
          <h1>{info.title}</h1>
          <p>Add, search and manage {info.title.toLowerCase()}.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          🔍
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${info.title.toLowerCase()}...`}
          />
        </div>

        <button className="primary" onClick={openAdd}>
          + Add {info.singular}
        </button>
      </div>

      {error && <div className="module-error">⚠️ {error}</div>}

      <div className="table-panel">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredData.length === 0 ? (
          <div className="empty">No records found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>

                {type === "students" && (
                  <>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Qualification</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Hall Ticket</th>
                  </>
                )}

                {type === "colleges" && (
                  <>
                    <th>College Name</th>
                    <th>Location</th>
                  </>
                )}

                {type === "placements" && (
                  <>
                    <th>Name</th>
                    <th>College</th>
                    <th>Date</th>
                    <th>Qualification</th>
                    <th>Year</th>
                  </>
                )}

                {type === "certificates" && (
                  <>
                    <th>Year</th>
                    <th>College</th>
                  </>
                )}

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  {type === "students" && (
                    <>
                      <td>{item.name}</td>
                      <td>{item.roll}</td>
                      <td>{item.qualification}</td>
                      <td>{item.course}</td>
                      <td>{item.year}</td>
                      <td>{item.hallTicketNo}</td>
                    </>
                  )}

                  {type === "colleges" && (
                    <>
                      <td>{item.collegeName}</td>
                      <td>{item.location}</td>
                    </>
                  )}

                  {type === "placements" && (
                    <>
                      <td>{item.name}</td>
                      <td>{item.college?.collegeName || "-"}</td>
                      <td>{item.date || "-"}</td>
                      <td>{item.qualification || "-"}</td>
                      <td>{item.year || "-"}</td>
                    </>
                  )}

                  {type === "certificates" && (
                    <>
                      <td>{item.year}</td>
                      <td>{item.college?.collegeName || "-"}</td>
                    </>
                  )}

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => openEdit(item)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="crud-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editMode ? "Update" : "Add"} {info.singular}
                </h2>
                <p>Enter the details below.</p>
              </div>

              <button
                className="modal-close"
                type="button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>
              {type === "students" && (
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label>Student Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Roll Number</label>
                    <input
                      type="number"
                      name="roll"
                      value={form.roll}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Qualification</label>
                    <input
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Course</label>
                    <input
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="number"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Hall Ticket Number</label>
                    <input
                      type="number"
                      name="hallTicketNo"
                      value={form.hallTicketNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {type === "colleges" && (
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label>College Name</label>
                    <input
                      name="collegeName"
                      value={form.collegeName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {type === "placements" && (
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label>Placement Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <CollegeField />

                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Qualification</label>
                    <input
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="number"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {type === "certificates" && (
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="number"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <CollegeField />
                </div>
              )}

              <div className="modal-actions">
                <button
                  className="cancel-button"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="primary" type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState("dashboard");

  const rolePermissions = {
    ADMIN: [
      "dashboard",
      "students",
      "colleges",
      "placements",
      "certificates",
    ],
    COLLEGE: [
      "dashboard",
      "colleges",
      "placements",
      "certificates",
    ],
    STUDENT: [
      "dashboard",
      "students",
      "placements",
      "certificates",
    ],
    CORPORATE: [
      "dashboard",
      "students",
      "placements",
    ],
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setActiveModule("dashboard");
    setPage("app");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const allowedModules =
    rolePermissions[user?.type] || rolePermissions.ADMIN;

  const goToModule = (module) => {
    if (!allowedModules.includes(module)) {
      alert("You do not have permission to access this page.");
      return;
    }

    setActiveModule(module);
  };

  if (page === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        goToSignup={() => setPage("signup")}
      />
    );
  }

  if (page === "signup") {
    return <SignupPage goToLogin={() => setPage("login")} />;
  }

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "students", icon: "🎓", label: "Students" },
    { id: "colleges", icon: "🏫", label: "Colleges" },
    { id: "placements", icon: "💼", label: "Placements" },
    { id: "certificates", icon: "📜", label: "Certificates" },
  ];

  const visibleMenuItems = menuItems.filter((item) =>
    allowedModules.includes(item.id)
  );

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">🎓</div>
          <div>
            <h2>PlaceMate</h2>
            <span>Placement Management</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          {visibleMenuItems.map((item) => (
            <button
              key={item.id}
              className={activeModule === item.id ? "active" : ""}
              onClick={() => goToModule(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div>
              <strong>{user?.name || "User"}</strong>
              <span>{user?.type || "ADMIN"}</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            ↩ Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeModule === "dashboard" ? (
          <Dashboard
            goToModule={goToModule}
            allowedModules={allowedModules}
          />
        ) : (
          <ModulePage type={activeModule} />
        )}
      </main>
    </div>
  );
}

export default App;