import { useMemo, useState } from "react";
import {
  Activity, ArrowRight, Bell, BookOpen, BookMarked, CalendarDays,
  CheckCircle2, ChevronRight, Clock3, FileText, FlaskConical, GraduationCap,
  Home, LayoutDashboard, LogOut, MessageCircle, MoreHorizontal, Search,
  Send, Settings, ShieldCheck, Sigma, Trophy, Users, ClipboardList, X,
  Menu, BarChart3, CircleHelp, Languages, Target, TrendingUp, UserRound,
  Bookmark, Sparkles
} from "lucide-react";

const subjects = [
  { name: "Mathematics", chapters: 15, icon: Sigma, tone: "blue", progress: 68 },
  { name: "Science", chapters: 16, icon: FlaskConical, tone: "green", progress: 42 },
  { name: "Social Science", chapters: 20, icon: GlobeIcon, tone: "orange", progress: 31 },
  { name: "Hindi", chapters: 14, icon: Languages, tone: "rose", progress: 76 },
  { name: "English", chapters: 13, icon: BookOpen, tone: "violet", progress: 54 },
  { name: "Sanskrit", chapters: 12, icon: BookMarked, tone: "gold", progress: 20 },
];
function GlobeIcon(props) { return <span className="globe-symbol" {...props}>◎</span>; }

const tests = [
  { title: "Real Numbers — Chapter Test", subject: "Mathematics", questions: 25, duration: "30 min", marks: 25, status: "Available" },
  { title: "Chemical Reactions — Practice", subject: "Science", questions: 20, duration: "25 min", marks: 20, status: "Available" },
  { title: "Nationalism in India", subject: "Social Science", questions: 30, duration: "35 min", marks: 30, status: "New" },
];

const initialMessages = [
  { from: "admin", text: "Welcome to RX Test App! Ask me if you need help with notes or tests.", time: "09:20 AM" },
  { from: "student", text: "Thank you. Please upload the next chapter PDF.", time: "09:24 AM" },
];

const adminUsers = [
  { name: "Aman Kumar", email: "aman.student@example.com", joined: "Today", status: "Active", tests: 12, avg: "82.5%" },
  { name: "Priya Kumari", email: "priya.student@example.com", joined: "Yesterday", status: "Active", tests: 8, avg: "76.0%" },
  { name: "Rahul Raj", email: "rahul.student@example.com", joined: "28 Oct", status: "Active", tests: 5, avg: "69.5%" },
];

function App() {
  const [mode, setMode] = useState("student");
  const [page, setPage] = useState("Home");
  const [adminPage, setAdminPage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [selectedUser, setSelectedUser] = useState(adminUsers[0]);
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [testStarted, setTestStarted] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredUsers = useMemo(() => adminUsers.filter(user =>
    (user.name + user.email).toLowerCase().includes(query.toLowerCase())
  ), [query]);

  function notify(text) {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  }
  function sendMessage() {
    if (!draft.trim()) return;
    setMessages(items => [...items, { from: mode === "admin" ? "admin" : "student", text: draft.trim(), time: "Now" }]);
    setDraft("");
  }
  function changeMode(next) {
    setMode(next);
    setPage("Home");
    setAdminPage("Dashboard");
    setMobileMenu(false);
  }

  const studentNav = [
    ["Home", Home], ["Subjects", BookOpen], ["Tests", ClipboardList],
    ["Chat", MessageCircle], ["Profile", UserRound],
  ];
  const adminNav = [
    ["Dashboard", LayoutDashboard], ["Users", Users], ["Content", FileText],
    ["Tests", ClipboardList], ["Messages", MessageCircle], ["Analytics", BarChart3],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={25} /></div>
          <div><strong>RX <span>TEST</span></strong><small>BIHAR BOARD · CLASS 10</small></div>
        </div>
        <div className="workspace-label">{mode === "student" ? "STUDENT SPACE" : "ADMIN WORKSPACE"}</div>
        <nav className="side-nav">
          {(mode === "student" ? studentNav : adminNav).map(([label, Icon]) => (
            <button key={label} className={(mode === "student" ? page === label : adminPage === label) ? "nav-item active" : "nav-item"}
              onClick={() => mode === "student" ? setPage(label) : setAdminPage(label)}>
              <Icon size={18} /><span>{label}</span>
              {label === "Chat" || label === "Messages" ? <i className="nav-dot" /> : null}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><Sparkles size={17}/><strong>Keep learning!</strong><p>Small steps every day lead to big results.</p></div>
          <button className="mode-switch" onClick={() => changeMode(mode === "student" ? "admin" : "student")}>
            <ShieldCheck size={17}/>{mode === "student" ? "Preview Admin Panel" : "Back to Student App"}
          </button>
          <div className="mini-user"><div className="avatar">R</div><div><b>{mode === "student" ? "Ravi Kumar" : "Super Admin"}</b><small>{mode === "student" ? "Class 10 Student" : "Administrator"}</small></div><MoreHorizontal size={18}/></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={20}/></button>
          <div className="breadcrumb">RX Test App <ChevronRight size={14}/> <b>{mode === "student" ? page : adminPage}</b></div>
          <div className="top-actions"><span className="board-pill">BSEB 2027</span><button className="icon-button" onClick={() => notify("You are all caught up!") }><Bell size={18}/><i/></button><div className="avatar small">R</div></div>
        </header>
        {mobileMenu && <div className="mobile-drawer">{(mode === "student" ? studentNav : adminNav).map(([label, Icon]) => <button key={label} onClick={() => { mode === "student" ? setPage(label) : setAdminPage(label); setMobileMenu(false); }}><Icon size={17}/>{label}</button>)}</div>}

        {mode === "student" ? (
          <StudentView page={page} setPage={setPage} activeSubject={activeSubject} setActiveSubject={setActiveSubject}
            testStarted={testStarted} setTestStarted={setTestStarted} messages={messages} draft={draft}
            setDraft={setDraft} sendMessage={sendMessage} notify={notify}/>
        ) : (
          <AdminView page={adminPage} users={filteredUsers} query={query} setQuery={setQuery}
            selectedUser={selectedUser} setSelectedUser={setSelectedUser} messages={messages}
            draft={draft} setDraft={setDraft} sendMessage={sendMessage} notify={notify}/>
        )}
        <footer className="footer-note">© 2026 RX Test App <span>Made for focused learning</span></footer>
      </main>
      {notice && <div className="toast"><CheckCircle2 size={17}/>{notice}</div>}
    </div>
  );
}

function PageHeading({ eyebrow, title, subtitle, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}
function StatCard({ icon: Icon, label, value, change, tone = "blue" }) {
  return <div className="stat-card"><div className={"stat-icon " + tone}><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong><small>{change}</small></div></div>;
}

function StudentView({ page, setPage, activeSubject, setActiveSubject, testStarted, setTestStarted, messages, draft, setDraft, sendMessage, notify }) {
  if (page === "Subjects") return <div className="content"><PageHeading eyebrow="YOUR LEARNING LIBRARY" title="Explore subjects" subtitle="Choose a subject and continue with your chapters."/><div className="subject-grid">{subjects.map(s => <SubjectCard key={s.name} subject={s} onClick={() => {setActiveSubject(s);setPage("Chapter");}}/>)}</div></div>;
  if (page === "Chapter") return <div className="content"><PageHeading eyebrow={activeSubject.name.toUpperCase()} title="Chapter library" subtitle="Study notes, practise MCQs and take chapter tests."/><div className="chapter-hero"><div><span className="tag">CLASS 10 · BSEB</span><h2>{activeSubject.name}</h2><p>{activeSubject.chapters} chapters · Notes and practice resources</p></div><BookOpen size={54}/></div><div className="chapter-list">{["Chapter 1 · Introduction and basics","Chapter 2 · Core concepts","Chapter 3 · Important applications","Chapter 4 · Revision and examples"].map((item,i)=><div className="chapter-row" key={item}><div className="chapter-number">{String(i+1).padStart(2,"0")}</div><div><b>{item}</b><small>PDF notes · MCQ practice · Chapter test</small></div><button className="text-button" onClick={()=>notify("Chapter resources will appear after PDFs are uploaded.")}>Open <ArrowRight size={15}/></button></div>)}</div></div>;
  if (page === "Tests") return <div className="content"><PageHeading eyebrow="CHECK YOUR PREPARATION" title="Tests & practice" subtitle="Build confidence with chapter tests and mock exams."/><div className="test-list">{tests.map((t,i)=><div className="test-card" key={t.title}><div className="test-symbol"><ClipboardList size={21}/></div><div className="test-info"><span className="tag">{t.subject}</span><h3>{t.title}</h3><p><CircleHelp size={14}/>{t.questions} questions <Clock3 size={14}/>{t.duration} <Trophy size={14}/>{t.marks} marks</p></div><button className="primary-button" onClick={()=>setTestStarted(true)}>Start test <ArrowRight size={16}/></button></div>)}</div>{testStarted && <div className="inline-panel"><div><b>Demo test preview</b><p>Question interface and timer will be connected to the live question bank.</p></div><button className="icon-button" onClick={()=>setTestStarted(false)}><X size={18}/></button></div>}</div>;
  if (page === "Chat") return <div className="content"><PageHeading eyebrow="DIRECT SUPPORT" title="Chat with admin" subtitle="Send a question and get help from your app administrator."/><ChatPanel messages={messages} draft={draft} setDraft={setDraft} sendMessage={sendMessage}/></div>;
  if (page === "Profile") return <div className="content"><PageHeading eyebrow="YOUR ACCOUNT" title="My profile" subtitle="Track your learning progress and account details."/><div className="profile-layout"><div className="profile-card"><div className="profile-cover"/><div className="profile-main"><div className="profile-avatar">R</div><h2>Ravi Kumar</h2><p>ravi.student@example.com</p><span className="tag">Class 10 · Bihar Board</span><button className="danger-button" onClick={()=>notify("Logout will be enabled with secure authentication.")}><LogOut size={16}/> Logout</button></div></div><div className="profile-right"><div className="stats-grid two"><StatCard icon={Trophy} label="Current rank" value="#5" change="Among your classmates"/><StatCard icon={ClipboardList} label="Tests attempted" value="12" change="Keep your streak going" tone="violet"/><StatCard icon={Activity} label="Average percentage" value="82.5%" change="Across attempted tests" tone="green"/><StatCard icon={Target} label="Best score" value="95%" change="Your personal best" tone="orange"/></div><div className="panel"><div className="panel-title"><h3>Recent performance</h3><span className="muted">Last 4 tests</span></div>{["Mathematics · Real Numbers","Science · Chemical Reactions","Hindi · Chapter 2","Social Science · History"].map((x,i)=><div className="performance-row" key={x}><span>{x}</span><b>{[95,84,78,73][i]}%</b><div className="progress"><i style={{width:[95,84,78,73][i]+"%"}}/></div></div>)}</div></div></div></div>;
  return <div className="content">
    <PageHeading eyebrow="WELCOME BACK, RAVI" title="Your learning space" subtitle="A focused place to prepare, practise and track your progress." action={<button className="outline-button" onClick={()=>setPage("Tests")}><ClipboardList size={16}/> Explore tests</button>}/>
    <div className="welcome-banner"><div><span className="tag light">BSEB CLASS 10</span><h2>Your board exam journey<br/>starts with one good session.</h2><p>Pick a subject, revise a chapter or challenge yourself with a test.</p><button className="white-button" onClick={()=>setPage("Subjects")}>Continue learning <ArrowRight size={16}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="book-emoji">📚</div><div className="floating-star">✦</div></div></div>
    <div className="stats-grid"><StatCard icon={Trophy} label="Your current rank" value="#5" change="In the class leaderboard"/><StatCard icon={ClipboardList} label="Tests attempted" value="12" change="+3 this week" tone="violet"/><StatCard icon={TrendingUp} label="Average score" value="82.5%" change="Good progress" tone="green"/><StatCard icon={Target} label="Study goal" value="4 / 5" change="Chapters this week" tone="orange"/></div>
    <div className="section-head"><div><div className="eyebrow">LEARN BY SUBJECT</div><h2>Your subjects</h2></div><button className="text-button" onClick={()=>setPage("Subjects")}>View all <ArrowRight size={15}/></button></div>
    <div className="subject-grid compact">{subjects.slice(0,4).map(s=><SubjectCard key={s.name} subject={s} onClick={()=>{setActiveSubject(s);setPage("Chapter");}}/>)}</div>
    <div className="lower-grid"><div className="panel"><div className="panel-title"><h3>Recommended tests</h3><button className="text-button" onClick={()=>setPage("Tests")}>See all</button></div>{tests.slice(0,2).map(t=><div className="mini-test" key={t.title}><div className="mini-icon"><FileText size={17}/></div><div><b>{t.title}</b><small>{t.questions} questions · {t.duration}</small></div><ChevronRight size={18}/></div>)}</div><div className="panel progress-panel"><div className="panel-title"><h3>Weekly progress</h3><CalendarDays size={18}/></div><div className="progress-ring"><div><b>68%</b><small>Goal complete</small></div></div><p>You are building a steady study habit. Keep it up!</p></div></div>
  </div>;
}

function SubjectCard({ subject, onClick }) {
  const Icon = subject.icon;
  return <button className="subject-card" onClick={onClick}><div className={"subject-icon "+subject.tone}><Icon size={23}/></div><div className="subject-card-text"><b>{subject.name}</b><small>{subject.chapters} chapters</small></div><ChevronRight size={17}/><div className="subject-progress"><i style={{width:subject.progress+"%"}}/></div></button>;
}
function ChatPanel({ messages, draft, setDraft, sendMessage }) {
  return <div className="chat-panel"><div className="chat-header"><div className="admin-avatar">A</div><div><b>RX Support · Admin</b><small><i className="online-dot"/> Usually replies soon</small></div><span className="secure-label"><ShieldCheck size={14}/> Private chat</span></div><div className="chat-messages">{messages.map((m,i)=><div key={i} className={"message "+(m.from==="student"?"mine":"")}><div>{m.text}</div><small>{m.time}</small></div>)}</div><form className="chat-compose" onSubmit={e=>{e.preventDefault();sendMessage();}}><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Write your message..." aria-label="Message"/><button className="send-button" aria-label="Send message"><Send size={17}/></button></form></div>;
}

function AdminView({ page, users, query, setQuery, selectedUser, setSelectedUser, messages, draft, setDraft, sendMessage, notify }) {
  if (page === "Users") return <div className="content"><PageHeading eyebrow="STUDENT DIRECTORY" title="Registered users" subtitle="Review student accounts and open a one-to-one conversation."/><div className="panel"><div className="table-toolbar"><div><h3>All students</h3><span className="muted">3 sample records · live records connect after backend setup</span></div><div className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name or email"/></div></div><div className="user-list">{users.map(u=><div className="user-row" key={u.email}><div className="avatar">{u.name[0]}</div><div className="user-identity"><b>{u.name}</b><small>{u.email}</small></div><span className="user-date">{u.joined}</span><span className="status-pill">{u.status}</span><div className="user-metrics"><b>{u.tests}</b><small>Tests</small></div><div className="user-metrics"><b>{u.avg}</b><small>Average</small></div><button className="primary-button small-button" onClick={()=>{setSelectedUser(u);notify("Selected "+u.name+" for direct chat.");}}> <MessageCircle size={15}/> Chat</button></div>)}</div></div><div className="note-box"><ShieldCheck size={17}/> Student passwords are never visible to admins; only permitted account and learning details are shown.</div></div>;
  if (page === "Messages") return <div className="content"><PageHeading eyebrow="STUDENT SUPPORT" title="Messages" subtitle="Select a registered student and continue a private conversation."/><div className="admin-chat-layout"><div className="conversation-list"><div className="panel-title"><h3>Conversations</h3><span className="tag">3 students</span></div>{adminUsers.map(u=><button key={u.email} className={selectedUser.email===u.email?"conversation active":"conversation"} onClick={()=>setSelectedUser(u)}><div className="avatar">{u.name[0]}</div><div><b>{u.name}</b><small>{u.email}</small><small className="last-message">Open conversation</small></div><ChevronRight size={16}/></button>)}</div><div className="admin-chat-main"><div className="chat-header"><div className="admin-avatar">{selectedUser.name[0]}</div><div><b>{selectedUser.name}</b><small>{selectedUser.email}</small></div><span className="secure-label"><ShieldCheck size={14}/> Private</span></div><ChatPanel messages={messages} draft={draft} setDraft={setDraft} sendMessage={sendMessage}/></div></div></div>;
  if (page === "Content") return <div className="content"><PageHeading eyebrow="LEARNING MATERIALS" title="Content manager" subtitle="Organise subjects, chapters and study PDFs."/><div className="admin-feature-grid">{[["Subjects","Create and organise the six board subjects",BookOpen],["Chapters","Add chapter titles and descriptions",Bookmark],["PDF notes","Upload, replace and remove chapter PDFs",FileText],["Question bank","Add MCQs, options and explanations",CircleHelp]].map(([t,d,I])=><div className="feature-card" key={t}><div className="stat-icon blue"><I size={20}/></div><h3>{t}</h3><p>{d}</p><button className="outline-button" onClick={()=>notify(t+" manager will be connected to Supabase.")}>Manage <ArrowRight size={15}/></button></div>)}</div></div>;
  if (page === "Tests") return <div className="content"><PageHeading eyebrow="ASSESSMENTS" title="Test manager" subtitle="Create, schedule and review student assessments."/><div className="panel"><div className="panel-title"><h3>Test library</h3><button className="primary-button" onClick={()=>notify("Test builder will be enabled with the question bank.")}>+ Create test</button></div>{tests.map(t=><div className="chapter-row" key={t.title}><div className="chapter-number"><ClipboardList size={17}/></div><div><b>{t.title}</b><small>{t.questions} questions · {t.duration} · {t.marks} marks</small></div><span className="status-pill">{t.status}</span><button className="text-button" onClick={()=>notify("Test editor will be connected next.")}>Edit <ChevronRight size={15}/></button></div>)}</div></div>;
  if (page === "Analytics") return <div className="content"><PageHeading eyebrow="APP OVERVIEW" title="Analytics" subtitle="A quick view of registrations, activity and test engagement."/><div className="stats-grid"><StatCard icon={Users} label="Registered users" value="48" change="All-time accounts"/><StatCard icon={Activity} label="Active today" value="12" change="Unique users today" tone="green"/><StatCard icon={ClipboardList} label="Test attempts" value="642" change="Across all students" tone="violet"/><StatCard icon={FileText} label="Study PDFs" value="36" change="Uploaded resources" tone="orange"/></div><div className="panel chart-panel"><div className="panel-title"><h3>Weekly active users</h3><span className="muted">Demo visual · last 7 days</span></div><div className="bar-chart">{[38,58,44,76,52,88,67].map((v,i)=><div key={i}><i style={{height:v+"%"}}/><small>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</small></div>)}</div></div></div>;
  return <div className="content"><PageHeading eyebrow="ADMIN OVERVIEW" title="Dashboard" subtitle="Manage your Class 10 learning app from one place." action={<span className="admin-badge"><ShieldCheck size={15}/> Admin mode</span>}/><div className="stats-grid"><StatCard icon={Users} label="Registered users" value="48" change="Total accounts" /><StatCard icon={Activity} label="Active today" value="12" change="Unique daily users" tone="green"/><StatCard icon={ClipboardList} label="Total tests" value="25" change="Published and drafts" tone="violet"/><StatCard icon={BarChart3} label="Test attempts" value="642" change="All-time attempts" tone="orange"/></div><div className="admin-overview-grid"><div className="panel"><div className="panel-title"><h3>Recent registrations</h3><button className="text-button" onClick={()=>notify("Open Users from the sidebar to view all accounts.")}>View users</button></div>{adminUsers.map(u=><div className="mini-test" key={u.email}><div className="avatar">{u.name[0]}</div><div><b>{u.name}</b><small>{u.email} · Joined {u.joined}</small></div><span className="status-pill">{u.status}</span></div>)}</div><div className="panel"><div className="panel-title"><h3>Quick actions</h3><Sparkles size={18}/></div><button className="quick-action" onClick={()=>notify("PDF upload will be connected to Supabase Storage.")}><FileText size={17}/> Upload chapter PDF <ArrowRight size={15}/></button><button className="quick-action" onClick={()=>notify("Question bank editor will be connected next.")}><CircleHelp size={17}/> Add MCQ questions <ArrowRight size={15}/></button><button className="quick-action" onClick={()=>notify("Create a test from the Test Manager.")}><ClipboardList size={17}/> Create a new test <ArrowRight size={15}/></button><button className="quick-action" onClick={()=>notify("Open Messages to contact any student.")}><MessageCircle size={17}/> Message a student <ArrowRight size={15}/></button></div></div></div>;
}

export default App;