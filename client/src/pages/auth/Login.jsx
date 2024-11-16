import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react" // Added useEffect import
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { loginUser } from "/store/auth-slice"

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    // Reset form data on component mount
    setFormData(initialState);
  }, []); // Added useEffect to reset form data

  function onSubmit(event) {
    event.preventDefault()

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Đăng nhập  tài khoản của bạn</h1> {/* Fixed typo in "Sign" */}
        <p className="mt-2"> Không có tài khoản!!! Hãy đăng ký tại đây:
          <Link className="font-bold text-primary ml-2 hover:underline" to='/auth/register'>Đăng ký</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={'Đăng nhập'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
    
  )
}

export default Login