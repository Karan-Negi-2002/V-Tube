import { signInWithPopup, signOut } from 'firebase/auth';
import { loginRequest, loginSuccess, loginFail, logOut } from '../Slices/authslice';
import { setUser } from '../Slices/userSlice';
import { auth, googleProvider } from '../../firebase/firebase';

export const login = () => async (dispatch) => {
   try {
      dispatch(loginRequest());

      const res = await signInWithPopup(auth, googleProvider);
      const accessToken = res.user.accessToken;
      const profile = {
         name: res.user.displayName,
         photoURL: res.user.photoURL,
      };

      sessionStorage.setItem('ytc-access-token', accessToken);
      sessionStorage.setItem('ytc-user', JSON.stringify(profile));

      dispatch(loginSuccess({ accessToken, user: profile }));
      dispatch(setUser({ avatar: profile.photoURL })); 
   } catch (error) {
    
      dispatch(loginFail(error.message));
   }
};

export const log_out = () => async (dispatch) => {
  
   await signOut(auth);
   dispatch(logOut());
   sessionStorage.removeItem('ytc-access-token');
   sessionStorage.removeItem('ytc-user');
  
};
