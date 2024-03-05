// import { useState } from 'react';
// import axios from 'axios';

// const AssignRole = () => {
//   const [userId, setUserId] = useState('');
//   const [role, setRole] = useState('');
//   const [message, setMessage] = useState('');

//   const handleAssignRole = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/admin/assign-role', {
//         userId,
//         role
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error assigning role: ' + error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Assign Role Page</h2>
//       <form onSubmit={handleAssignRole}>
//         <label>User ID:</label>
//         <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
//         <label>Role:</label>
//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="">Select Role</option>
//           <option value="admin">Admin</option>
//           <option value="user">User</option>
//         </select>
//         <button type="submit">Assign Role</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AssignRole;
