import * as yup from "yup";

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    // .min(2, "Phone must be at least 2 characters")
    .required("Vui lòng điền vào mục này."),
  password: yup
    .string()
    // .min(4, "Password must be at least 4 characters")
    .required("Vui lòng điền vào mục này."),
});

export const registerSchema = yup.object().shape({
  phone: yup
    .string()
    // .min(2, "Phone must be at least 2 characters")
    .required("Vui lòng điền vào mục này."),
  name: yup
    .string()
    // .email("Invalid email format")
    .required("Vui lòng điền vào mục này."),
  password: yup
    .string()
    // .min(4, "Password must be at least 4 characters")
    .required("Vui lòng điền vào mục này."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp.")
    .required("Vui lòng điền vào mục này."),
  address: yup
    .string()
    // .min(4, "Password must be at least 4 characters")
    .required("Vui lòng điền vào mục này."),
});
