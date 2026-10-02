'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleSignIn = () => {
        router.replace('/dashboard');
        setSuccess('Sign in successful');
        setError(null);
    }
    const handleSignUp = () => {
        router.push('/sign-in');
        setSuccess('Sign up successful');
        setError(null);
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
        if (type === 'sign-in') {
            handleSignIn();
        } else {
            handleSignUp();
        }
    }



    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email')} />
                    {errors.email && <p className="text-red-500">{errors.email.message as string}</p >}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register('password')} />
                    {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
                    </div>
                <button type="submit">{isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
        </div>

    )
}

export default SignForm;