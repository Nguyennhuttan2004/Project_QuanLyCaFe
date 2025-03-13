import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "/store/auth-slice/index.js";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: '',
  email: '',
  password: '',
  role: 'user',
  avatar: 'null',
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    console.log("Submitting form data:", formData);
  
    dispatch(registerUser(formData)).then((data) => {
      console.log("Response data:", data); // Log dữ liệu phản hồi
      if (data?.payload?.success) {
        toast({
          title: "Đăng ký thành công",
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message || "Email đã tồn tại !!!",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md "> 
        <div className="">
          <h1 className="text-3xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">Tạo tài khoản mới</h1>
          <p className="mt-2 text-gray-600 text-center"> 
            Nếu đã có tài khoản!!! Hãy đến trang này
            <Link className="font-medium text-blue-600 ml-2 hover:underline" to='/auth/login'>Đăng nhập</Link> 
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={'Đăng ký'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default Register;