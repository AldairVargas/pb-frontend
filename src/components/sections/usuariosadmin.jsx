import React, { useEffect, useState, useMemo } from "react";
import useCRUD from "../../hooks/useCRUD";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string().email("Formato inválido").required("Requerido"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Debe tener mayúscula, minúscula, número y carácter especial"
    ),
  first_name: Yup.string()
    .required("Requerido")
    .min(2)
    .max(50)
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Solo letras"),
  last_name: Yup.string()
    .required("Requerido")
    .min(2)
    .max(50)
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Solo letras"),
  phone: Yup.string()
    .required("Requerido")
    .matches(/^\d{10}$/, "Debe tener 10 dígitos"),
  role_id: Yup.number().required("Requerido").min(1).max(3),
});

const UsuariosAdmin = () => {
  const token = localStorage.getItem("token");
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const { data: usuarios, fetchData, saveData, readItem } = useCRUD(`${import.meta.env.VITE_API_URL}/users`, headers);

  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openEditModal = async (userId) => {
    const user = await readItem(`${import.meta.env.VITE_API_URL}/users/${userId}`, headers);
    setEditingUser(user);
    setIsOpen(true);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser
        ? `${import.meta.env.VITE_API_URL}/users/${editingUser.user_id}`
        : `${import.meta.env.VITE_API_URL}/users`;

      const payload = { ...values };
      if (!values.password) delete payload.password; // Evitar actualizar contraseña vacía

      await saveData(url, method, payload, headers);
      toast.success(editingUser ? "Usuario actualizado" : "Usuario creado");
      setIsOpen(false);
      setEditingUser(null);
      fetchData();
      resetForm();
    } catch (error) {
      toast.error("Error al guardar");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 pt-20 md:pt-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Usuarios</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setIsOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus className="w-4 h-4" /> Crear Usuario
        </button>
      </div>

      <table className="w-full bg-white shadow rounded-xl border border-gray-200">
        <thead>
          <tr className="text-center text-gray-600 border-b">
            <th className="px-6 py-4">Nombre</th>
            <th className="px-6 py-4">Correo</th>
            <th className="px-6 py-4">Rol</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {usuarios?.map((user) => (
            <tr key={user.user_id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.Role?.role_name}</td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {user.active ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-6 py-4 space-x-3">
                <button onClick={() => openEditModal(user.user_id)} className="text-blue-600 hover:underline">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isOpen} onClose={() => { setIsOpen(false); setEditingUser(null); }} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between mb-4">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                {editingUser ? "Editar Usuario" : "Crear Usuario"}
              </Dialog.Title>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <Formik
              initialValues={{
                email: editingUser?.email || "",
                password: "",
                first_name: editingUser?.first_name || "",
                last_name: editingUser?.last_name || "",
                phone: editingUser?.phone || "",
                registration_date: editingUser?.registration_date || new Date(),
                role_id: editingUser?.role_id || 1,
                active: editingUser?.active ?? true
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <Field name="first_name" placeholder="Nombre" className="input w-full" />
                  <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm" />
                  
                  <Field name="last_name" placeholder="Apellido" className="input w-full" />
                  <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm" />
                  
                  <Field name="email" type="email" placeholder="Correo" className="input w-full" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                  <Field name="phone" placeholder="Teléfono" className="input w-full" />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />

                  <Field name="password" type="password" placeholder="Contraseña (solo si cambia)" className="input w-full" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                  <Field as="select" name="role_id" className="input w-full">
                    <option value={1}>Admin</option>
                    <option value={2}>User</option>
                    <option value={3}>SuperAdmin</option>
                  </Field>
                  <ErrorMessage name="role_id" component="div" className="text-red-500 text-sm" />

                  <div className="flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      {isSubmitting ? "Guardando..." : editingUser ? "Guardar cambios" : "Guardar"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UsuariosAdmin;
