
function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

    return (
        <div className="auth-container">
            <div id="login-container">
                <div className="login-left">
                    <p>Hello friend...!!</p>
                    <p>Welcome back to our blog</p>
                    <p id="message" style={{ fontSize: '1.5rem' }}>{message}</p>
                    <form action="">
                        <div className="form-element">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" value={email} onInput={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Password</label>
                            <input id="password" value={password} onInput={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                            <p id="pass-feeback"></p>
                            <div><a href="" style={{ color: 'white', fontSize: '1.5rem' }}>forget password</a></div>
                        </div>
                        <div id="signin-btn" className="flex space-around"><a onClick={() => handleSubmit} className="btn btn-primary">Sign in</a></div>
                    </form>
                </div>
                <div className="login-right flex align-center flex-col">
                    <img src="./assets/images/blogger-sign.svg" alt="" />
                    <p>Become a reader today and start leading your future...! </p>
                    <div className="flex space-around">
                        <a href="./register.html" className="btn btn-secondary">Sign up</a>
                        <a href="./blog-pages/blog.html" className="btn btn-primary">Go Home</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Render the component
ReactDOM.render(<LoginForm />, document.getElementById('loginForm'));

