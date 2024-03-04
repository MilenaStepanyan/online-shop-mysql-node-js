import { Route } from 'react-router-dom';
import AdminProducts from './components/AdminProducts';
import AssignRole from './components/AssignRole';

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/assign-role" element={<AssignRole />} />
    </>
  );
};

export default AdminRoutes;
