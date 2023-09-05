import React, { useContext, useEffect, useRef, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../Input/Input";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  useEffect(() => {
    const validityTimer = setTimeout(() => {
      console.log("Checking Validity!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      console.log("CLEANUP!");
      clearTimeout(validityTimer);
    };
  }, [enteredEmail, enteredPassword]);

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(enteredEmail, enteredPassword);
    } else if(!emailIsValid){
      emailRef.current.dofocus();
    } else{
      passwordRef.current.dofocus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref = {emailRef}
          id="email"
          type="email"
          label="E-mail"
          isValid = {emailIsValid}
          value={enteredEmail}
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
        ></Input>
        <Input
          ref = {passwordRef}
          id="Password"
          type="Password"
          label="Password"
          isValid = {passwordIsValid}
          value={enteredPassword}
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
        ></Input>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
