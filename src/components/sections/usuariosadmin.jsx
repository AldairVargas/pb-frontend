import React, { useEffect, useState, useMemo } from "react";
import useCRUD from "../../hooks/useCRUD";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Dialog } from "@headlessui/react";
import { Plus, X, Pencil, Power } from "lucide-react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string().email("Formato inválido").required("Requerido"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Debe tener mayúscula, minúscula, número y carácter especial"
    ),
  first_name: Yup.string()
    .required("Requerido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres")
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Solo letras"),
  last_name: Yup.string()
    .required("Requerido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres")
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Solo letras"),
  phone: Yup.string()
    .required("Requerido")
    .matches(/^\d{10}$/, "Debe tener 10 dígitos"),
  role_id: Yup.number().required("Requerido").min(1).max(3),
});

const UsuariosAdmin = () => {
  const token = localStorage.getItem("token");
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const { data: usuarios, fetchData, saveData } = useCRUD(`${import.meta.env.VITE_API_URL}/users`, headers);

  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreateModal = () => {
    setEditingUser(null);
    setIsOpen(true);
  };

  const handleCreateOrEditUser = async (values, { resetForm, setSubmitting }) => {
    try {
      if (editingUser) {
        const updated = { ...values };
        if (!updated.password) delete updated.password;

        await saveData(`${import.meta.env.VITE_API_URL}/users/${editingUser.user_id}`, "PUT", updated, headers);
        toast.success("Usuario actualizado correctamente");
      } else {
        const payload = { ...values, active: true };
        await saveData(`${import.meta.env.VITE_API_URL}/users`, "POST", payload, headers);
        toast.success("Usuario creado correctamente");
      }

      fetchData();
      setIsOpen(false);
      setEditingUser(null);
      resetForm();
    } catch (error) {
      toast.error("Error al guardar el usuario");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleUserStatus = (user) => {
    const newStatus = !user.active;
    toast.info(
      <div>
        <p>¿Seguro que deseas <strong>{newStatus ? "activar" : "desactivar"}</strong> este usuario?</p>
        <div className="mt-2 flex justify-end gap-3">
          <button className="text-sm text-gray-600 hover:underline" onClick={() => toast.dismiss()}>
            Cancelar
          </button>
          <button
            className={`text-sm font-semibold ${newStatus ? "text-green-600" : "text-red-600"} hover:underline`}
            onClick={async () => {
              try {
                await saveData(`${import.meta.env.VITE_API_URL}/users/${user.user_id}/status`, "PUT", { active: newStatus }, headers);
                toast.dismiss();
                toast.success(`Usuario ${newStatus ? "activado" : "desactivado"} correctamente`);
                fetchData();
              } catch (err) {
                toast.dismiss();
                toast.error("Error al actualizar el estado del usuario");
                console.error(err);
              }
            }}
          >
            Confirmar
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="p-6 pt-20 md:pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Usuarios</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus className="w-4 h-4" /> Crear Usuario
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200 text-center">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Correo</th>
              <th className="px-6 py-4 font-semibold">Rol</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {usuarios?.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.Role?.role_name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {user.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                      onClick={() => {
                        setEditingUser(user);
                        setIsOpen(true);
                      }}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user)}
                      className={`${user.active ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}`}
                      title={user.active ? "Desactivar" : "Activar"}
                    >
                      <Power className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Crear / Editar */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-800">
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
                role_id: editingUser?.role_id?.toString() || "1",
              }}
              validationSchema={validationSchema}
              onSubmit={handleCreateOrEditUser}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <Field name="first_name" className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm" />
                      <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Apellido</label>
                      <Field name="last_name" className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm" />
                      <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Correo</label>
                    <Field name="email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <Field name="phone" className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm" />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                  </div>
                  {!editingUser && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                      <Field name="password" type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                    <Field as="select" name="role_id" className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">SuperAdmin</option>
                    </Field>
                    <ErrorMessage name="role_id" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow disabled:opacity-60"
                    >
                      {isSubmitting ? "Guardando..." : "Guardar"}
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
