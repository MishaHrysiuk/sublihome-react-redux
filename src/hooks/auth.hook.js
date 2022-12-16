import {
    useLoginMutation,
    useCreateUserMutation
} from "../api/apiSlice";
import jwtDecode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('user'));

export const useAuth = () => {
    
    const [signUp] = useCreateUserMutation();
    const [signIn] = useLoginMutation();

    const isLoggedIn = () => {
        try {
            const obj = jwtDecode(currentUserSubject.value);
            return Object.keys(obj).every(i => ['UserEmail', 'UserId', 'UserIsAdmin', 'iss', 'exp', 'aud'].includes(i))
        }
        catch (err) {
            return false
        }
    }

    // const register = async (user) => {
    //     return await signUp(user).unwrap();
    // };

    async function login(userData) {

        try {
            const user = await signIn(userData).unwrap();
            localStorage.setItem('user', user.token);
            currentUserSubject.next(user.token);
            window.location.reload();
            return user;
        } catch (err) {
            localStorage.removeItem('user');
            currentUserSubject.next(null);
            window.location.reload();
            alert('Невірний логін або пароль');
        }
    }

    // const login = async (user) => {
    //     const data = await signIn(user)
    //         .unwrap();
    //     if (data.token) {
    //         localStorage.setItem("user", data.token);
    //     }
    //     return data;
    // };

    function logout() {
        localStorage.removeItem('user');
        currentUserSubject.next(null);
        window.location.reload()
    }

    // const logout = () => {
    //     localStorage.removeItem("user");
    // };

    // const getCurrentUser = () => {
    //     return jwtDecode(localStorage.getItem("user"));
    // };

    // return {
    //     login,
    //     register,
    //     logout,
    //     getCurrentUser
    // }

    return {
        login,
        logout,
        isLoggedIn: isLoggedIn(),
        currentUserId: currentUserSubject.value ? jwtDecode(currentUserSubject.value).UserId : null,
        currentUserIsAdmin: currentUserSubject.value ? jwtDecode(currentUserSubject.value).UserIsAdmin === 'True' : false,
    }
}