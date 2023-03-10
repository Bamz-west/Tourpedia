import { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBValidationItem, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";

const initialState = {
    email: "",
    password: ""
}

const Login = () => {

    const [formValue, setFormValue] = useState(initialState);

    const { email, password } = formValue;

    const { loading, error, errorMessage } = useSelector((state) => ({ ...state.auth }));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
      error && toast.error(errorMessage);
    }, [error, errorMessage])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    }

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const googleSuccess = (res) => {
        const email = res?.profileObj?.email;
        const name = res?.profileObj?.name;
        const token = res?.tokenId;
        const googleId = res?.googleId;

        const result = { email, name, token, googleId };

        dispatch(googleSignIn({result, navigate, toast}));
    };

    const googleFailure = (err) => {
        toast.error(err);
    };

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <MDBValidationItem className="col-md-12" feedback="Please provide your email" invalid>
                            <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem className="col-md-12" feedback="Please provide your password" invalid>
                            <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && <MDBSpinner size="sm" role="status" tag="span" className="me-2" />}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br />
                    <GoogleLogin 
                        clientId="875746274401-4uttr3pfm61hkrb9ro15i5rbhm4lovsa.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <MDBBtn style={{width: "100%"}} color="danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <MDBIcon className="me-2" fab icon="google" />
                                Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
}

export default Login;