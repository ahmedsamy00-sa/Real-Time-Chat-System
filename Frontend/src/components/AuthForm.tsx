import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { HiMail, HiLockClosed, HiUser, HiPhone } from "react-icons/hi";
import * as Yup from "yup";

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (values: LoginValues | RegisterValues) => Promise<void>;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading }) => {
  const isLogin = type === "login";

  const loginSchema = Yup.object({
    email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("مطلوب"),
  });

  const registerSchema = Yup.object({
    name: Yup.string()
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .max(50, "الاسم طويل جداً")
      .required("مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("مطلوب"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "كلمات المرور غير متطابقة")
      .required("مطلوب"),
    phone: Yup.string().required("مطلوب"),
  });

  const initialValues = isLogin
    ? { email: "", password: "" }
    : { name: "", email: "", password: "", confirmPassword: "", phone: "" };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-text-primary">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {isLogin ? "مرحباً بك مرة أخرى" : "انضم إلينا اليوم"}
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={isLogin ? loginSchema : registerSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiUser className="h-5 w-5 text-text-secondary" />
                      </div>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="smooth-transition block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:input-field-focus bg-white"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-error-500 text-sm mt-1 font-medium"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiMail className="h-5 w-5 text-text-secondary" />
                    </div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-colors duration-200 bg-white"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-error-500 text-sm mt-1 font-medium"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-primary mb-1"
                  >
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiLockClosed className="h-5 w-5 text-text-secondary" />
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-colors duration-200 bg-white"
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-error-500 text-sm mt-1 font-medium"
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-text-primary mb-1"
                      >
                        تأكيد كلمة المرور
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiLockClosed className="h-5 w-5 text-text-secondary" />
                        </div>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-colors duration-200 bg-white"
                          placeholder="أعد إدخال كلمة المرور"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-error-500 text-sm mt-1 font-medium"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-text-primary mb-1"
                      >
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiPhone className="h-5 w-5 text-text-secondary" />
                        </div>
                        <Field
                          id="phone"
                          name="phone"
                          type="tel"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-colors duration-200 bg-white"
                          placeholder="أدخل رقم الهاتف"
                        />
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-error-500 text-sm mt-1 font-medium"
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="auth-button w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                      <span>جاري التحميل...</span>
                    </div>
                  ) : isLogin ? (
                    "تسجيل الدخول"
                  ) : (
                    "إنشاء الحساب"
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link
                  href={isLogin ? "/register" : "/login"}
                  className="font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
                >
                  {isLogin
                    ? "ليس لديك حساب؟ سجل الآن"
                    : "لديك حساب بالفعل؟ سجل دخولك"}
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
