import React, { useState } from 'react';

function App() {
  // --- 1. STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [studentData, setStudentData] = useState({ 
    rollNo: '', 
    studentClass: '', 
    year: '1st Year' // Default value matching the select option
  });

  // --- 2. DYNAMIC SUBJECT DATA ---
  const [allSubjects] = useState([
    // 1st Year (Sem 1 & 2)
    { id: 1, name: "C Programming", sem: 1, year: "1st Year", syllabus: "Basics, Loops, Arrays, Pointers." },
    { id: 2, name: "Digital Electronics", sem: 2, year: "1st Year", syllabus: "Logic Gates, K-Maps, Flip-Flops." },
    // 2nd Year (Sem 3 & 4)
    { id: 3, name: "Data Structures", sem: 3, year: "2nd Year", syllabus: "Stacks, Queues, Linked Lists, Trees." },
    { id: 4, name: "Operating Systems", sem: 4, year: "2nd Year", syllabus: "CPU Scheduling, Deadlocks, Memory Management." },
    // 3rd Year (Sem 5 & 6)
    { id: 5, name: "Java Programming", sem: 5, year: "3rd Year", syllabus: "OOPs, Exception Handling, Applets, Threads." },
    { id: 6, name: "Computer Graphics", sem: 6, year: "3rd Year", syllabus: "Transformation, Clipping, Curves, Shading." },
    { id: 7, name: "Cloud Computing", sem: 6, year: "3rd Year", syllabus: "SaaS, PaaS, IaaS, Virtualization, Security." }
  ]);

  // --- 3. LOGIC: FILTER BY YEAR AND SEARCH TERM ---
  const filteredSubjects = allSubjects.filter(sub => 
    sub.year === studentData.year && 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (studentData.rollNo && studentData.studentClass) {
      setIsLoggedIn(true);
    } else {
      alert("Please fill in all details");
    }
  };

  // --- 4. VIEW: LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px' }}>
          <h2 style={{ textAlign: 'center', color: '#1a237e' }}>EduVibe Login</h2>
          <div style={{ marginBottom: '15px' }}>
            <label>Roll Number:</label>
            <input type="text" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
              onChange={(e) => setStudentData({...studentData, rollNo: e.target.value})} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Class:</label>
            <input type="text" placeholder="BCA" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
              onChange={(e) => setStudentData({...studentData, studentClass: e.target.value})} required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Select Year:</label>
            <select 
              value={studentData.year}
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              onChange={(e) => setStudentData({...studentData, year: e.target.value})}
            >
              <option value="1st Year">1st Year (Sem 1-2)</option>
              <option value="2nd Year">2nd Year (Sem 3-4)</option>
              <option value="3rd Year">3rd Year (Sem 5-6)</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#1a237e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  // --- 5. VIEW: DASHBOARD ---
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: '#1a237e', color: 'white', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>EduVibe</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px' }}>Roll No: {studentData.rollNo} | {studentData.year}</div>
          <button onClick={() => {setIsLoggedIn(false); setSearchTerm("");}} style={{ background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer', padding: '2px 10px', marginTop: '5px', borderRadius: '4px' }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: '#1a237e' }}>{studentData.year} Dashboard</h1>
        
        <input 
          type="text" 
          placeholder="🔍 Search subjects..." 
          style={{ width: '100%', padding: '15px', borderRadius: '30px', border: '1px solid #ccc', fontSize: '16px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', outline: 'none' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map(sub => (
              <div key={sub.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', borderLeft: '8px solid #1a237e' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{sub.name}</h3>
                <p><strong>Semester:</strong> {sub.sem}</p>
                <button 
                  onClick={() => setSelectedSubject(sub)}
                  style={{ backgroundColor: '#1a237e', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '10px' }}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#7f8c8d' }}>No subjects found for "{searchTerm}" in {studentData.year}.</p>
          )}
        </div>
      </div>

      {/* --- SYLLABUS MODAL --- */}
      {selectedSubject && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
            <h2 style={{ color: '#1a237e' }}>{selectedSubject.name}</h2>
            <p style={{ color: '#7f8c8d' }}>Semester {selectedSubject.sem} | {selectedSubject.year}</p>
            <hr />
            <p style={{ lineHeight: '1.6' }}><strong>Key Topics:</strong><br /> {selectedSubject.syllabus}</p>
            <button 
              onClick={() => setSelectedSubject(null)} 
              style={{ marginTop: '20px', padding: '10px 25px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;