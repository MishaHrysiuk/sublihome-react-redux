import {
    useLoginMutation
} from "../api/apiSlice";
import jwtDecode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('user'));

export const useAuth = () => {
    
    const [signIn] = useLoginMutation();

    const isLoggedIn = () => {
        try {
            const obj = jwtDecode(currentUserSubject.value);
            return Date.now().toString() < obj.exp.toString() &&
                Object.keys(obj).every(i => ['UserEmail', 'UserId', 'UserIsAdmin', 'iss', 'exp', 'aud'].includes(i))
        }
        catch (err) {
            return false
        }
    }

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

    function logout() {
        localStorage.removeItem('user');
        currentUserSubject.next(null);
        window.location.reload()
    }

    return {
        login,
        logout,
        isLoggedIn: isLoggedIn(),
        currentUserId: currentUserSubject.value ? jwtDecode(currentUserSubject.value).UserId : null,
        currentUserIsAdmin: currentUserSubject.value ? jwtDecode(currentUserSubject.value).UserIsAdmin === 'True' : false,
    }
}