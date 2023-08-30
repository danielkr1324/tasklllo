import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login, signup } from '../store/actions/user.actions';
import leftHero from '../assets/images/left-loginsignup-hero.svg';
import rightHero from '../assets/images/right-loginsignup-hero.svg';
import logo from '../assets/images/Tasklllo-logo.png'

export function LoginSignup() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(params.status);
  const [wrongCredentialsDiv, setWrongCredentialsDiv] = useState('');

  useEffect(() => {
    setStatus(params.status);
    setWrongCredentialsDiv('not-visible');
  }, [params.status]);

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(15, 'Must be 15 characters or less'),
      username: Yup.string().max(20, 'Must be 20 characters or less'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: async (values) => {
		try {
		 if (status === 'signup') await dispatch(signup(values));
		 else if (status === 'login') {
        const user = await dispatch(login(values));
        if (!user) {
          setWrongCredentialsDiv('visible');
          return;
        }
		  }
		  navigate('/workspace');
		} catch (err) {
		    if (status === 'login') setWrongCredentialsDiv('visible');
		  }
	  }
  });

  const handleFocus = (ev) => {
    ev.target.classList.add('focus');
  };

  const formTxt = status === 'login' ? 'Log in to Tasklllo' : 'Sign up for your account';

  return (
    <section className="form-container">
      <div className='form-top'>
        <img className='logo' src={logo} alt="" />
        <h1>Tasklllo</h1>
      </div>
      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <h1>{formTxt}</h1>
        <div className={`wrong-credentials ${wrongCredentialsDiv}`}>
          Incorrect Username and / or password.
        </div>
        {status === 'signup' && (
          <>
            <input
              id="fullname"
              name="fullname"
              type="text"
              onChange={formik.handleChange}
              onFocus={handleFocus}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              placeholder="Enter full name"
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <span className="error">{formik.errors.fullname}</span>
            )}
          </>
        )}
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Enter username"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="error">{formik.errors.username}</span>
        )}
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="error">{formik.errors.password}</span>
        )}
        <button type="submit">{formTxt}</button>

        <hr className="bottom-form-separator" />
        {status === 'login' ? (
          <NavLink className="already-have-account" to={'/signup'}>
            Sign up for an account
          </NavLink>
        ) : (
          <NavLink className="already-have-account" to={'/login'}>
            Already have an account? Log In
          </NavLink>
        )}
      </form>
      <img src={leftHero} alt="leftHero" className="hero left-hero" />
      <img src={rightHero} alt="rightHero" className="hero right-hero" />
    </section>
  );
};

