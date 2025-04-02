import { useState } from 'react';

const users = [
  { email: "kaikov@gmail.com", password: "Admin123", role: "admin", active: true },
  { email: "invited@user.com", password: "", role: "user", active: true },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('login');

  const validatePassword = (pw) => {
    return pw.length >= 8 && /[a-z]/.test(pw) && /[A-Z]/.test(pw);
  };

  const handleLogin = () => {
    const user = users.find(u => u.email === email);
    if (!user) return setError("משתמש לא קיים");
    if (!user.active) return setError("המשתמש מושעה");

    if (!user.password) {
      if (!validatePassword(newPassword)) return setError("הסיסמה לא עומדת בדרישות");
      if (newPassword !== confirmPassword) return setError("הסיסמאות לא תואמות");
      user.password = newPassword;
      alert("הסיסמה נשמרה. כנס שוב עם הסיסמה שבחרת.");
      setStage("login");
      return;
    }

    if (user.password !== password) return setError("סיסמה שגויה");
    alert(`שלום ${user.email}, התחברת בהצלחה!`);
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h2>כניסה למערכת</h2>
      <input placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      {users.find(u => u.email === email && !u.password) ? (
        <>
          <input placeholder="בחר סיסמה" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
          <input placeholder="אשר סיסמה" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
        </>
      ) : (
        <input placeholder="סיסמה" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
}
