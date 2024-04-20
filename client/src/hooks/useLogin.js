import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import {  message } from 'antd';

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email, password) => {
		const success = handleInputErrors(email, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("http://localhost:3006/api/v1/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ user:{email, password} }),
			});
			console.log('res',res.body);
			const data = await res.json();
			console.log('data',data);
			if (!data.success) {
				throw new Error(data.message);
			}else{
				message.success('Successfully logged In')
			}

			// localStorage.setItem("chat-user", JSON.stringify(data));
			localStorage.setItem("token", JSON.stringify(data.token));
			localStorage.setItem("user", JSON.stringify(data.user));
			setAuthUser(data.user);
			
		} catch (error) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			toast.error(error.message);
		} finally {
			
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
	if (!email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
