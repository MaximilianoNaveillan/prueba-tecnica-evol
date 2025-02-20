import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTask } from "../store/taskSlice";
import { AppDispatch } from "../store/store";

const NewTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    dueDate: Yup.date().nullable(),
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Crear Nueva Tarea
      </h2>

      <Formik
        initialValues={{
          title: "",
          description: "",
          completed: false,
          tags: [],
          dueDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(addTask(values));
          setSubmitting(false);
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Título:</label>
              <Field
                type="text"
                name="title"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700">Descripción:</label>
              <Field
                as="textarea"
                name="description"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Fecha de vencimiento:
              </label>
              <Field
                type="date"
                name="dueDate"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewTask;
