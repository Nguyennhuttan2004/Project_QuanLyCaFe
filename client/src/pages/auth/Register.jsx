import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "/store/auth-slice/index.js"
import { useToast } from "@/hooks/use-toast"

const initialState = {
  userName : '',
  email: '',
  password: '',
}


const Register = () => {


  const [formData, setFromData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()


  function onSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
      
    })
  }

  console.log(formData)

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account </h1>
        <p className="mt-2">Already have an account
         <Link className="font-medium text-primary ml-2 hover:underline " to='/auth/login'>Login</Link> 
           </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText ={'Sign Up'}
        formData={formData}
        setFromData={setFromData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register