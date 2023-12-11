import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'


function ChangePassword() {

    const [navbar, setNavbar] = useState(false)

    const [formData, setFormData] = useState({
        oldPassword: "",
        password1: '',
        password2: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    // const { token, isSuccess, isError, message, status } = useSelector(store => store.auth)
    const [refresh, setRefresh] = useState()
    // const dispatch = useDispatch()
    const router = useRouter()


    // useEffect(() => {
    //     if (isError) {
    //         router.push("/dashboard/login")
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isError])

    // useEffect(() => {
    //     if (formData.password1 && isSuccess) {
    //         toast.success("Password Updated !")
    //         // router.push('/dashboard/change-password')
    //         setFormData({
    //             password1: '',
    //             password2: ''
    //         })
    //         dispatch(successReset())
    //     }
    //     else if (isError) {
    //         if (status === 401) {
    //             toast.error(message)
    //             router.push("/dashboard/login")
    //         }
    //         else {
    //             toast.error(message)
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps        
    // }, [refresh, isSuccess, isError, status])

    const onSubmit = (e) => {
        e.preventDefault()

        if (formData.password1 === formData.password2) {
            // dispatch(updatePassword({password: formData.password1, oldPassword: formData.oldPassword}))
            setRefresh(!refresh)
        }
        else {
            toast.error("Passwords Don't Match !")
        }
    }

    return (
        <div className='mx-auto mb-6 pt-6 bg-neutral shadow-md rounded-xl w-10/12 h-fit'>
            {/* <h2 className='w-fit mx-auto text-primary text-xl font-bold my-6'>Change password :</h2> */}
            <h2 className='w-fit mb-12 mx-auto text-primary border-b-2 border-tertiary text-xl px-4 font-bold '>CHANGE PASSWORD</h2>
            <form dir='ltr' onSubmit={onSubmit} className='px-2'>
                <div className="grid grid-cols-1 justify-items-center">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                        value={formData.oldPassword}
                        placeholder="Currrent Password" className="input input-sm input-bordered text-black bg-neutral font-extrabold w-full max-w-xs mx-auto"
                    />
                    {showPassword ? (
                        <MdVisibility
                            className='w-5 h-5 relative bottom-7 left-28 sm:relative sm:right-0'
                            onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
                        />
                    ) : (
                        <MdVisibilityOff
                            className='w-5 h-5 relative bottom-7 left-28 sm:relative sm:right-0'
                            onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
                        />
                    )}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
                        value={formData.password1}
                        placeholder="New Password" className="input input-sm input-bordered text-black bg-neutral font-extrabold w-full max-w-xs mx-auto"
                    />
                    {showPassword ? (
                        <MdVisibility
                            className='w-5 h-5 relative bottom-7 left-28 sm:relative sm:right-0'
                            onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
                        />
                    ) : (
                        <MdVisibilityOff
                            className='w-5 h-5 relative bottom-7 left-28 sm:relative sm:right-0'
                            onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
                        />
                    )}

                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                        value={formData.password2}
                        placeholder="re-enter password" className="input input-sm input-bordered text-black bg-neutral font-extrabold w-full max-w-xs mx-auto"
                    />
                    {showPassword ? (
                        <MdVisibility
                            className='w-5 h-5 relative bottom-7 left-28 sm:relative sm:right-0'
                            onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
                        />
                    ) : (
                        <MdVisibilityOff
                            className='w-5 h-5 relative bottom-7 left-28 sm:relative sm:right-0'
                            onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
                        />
                    )}
                </div>
                <div className="text-end mt-6">
                    <button className="btn btn-ghost">submit</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword