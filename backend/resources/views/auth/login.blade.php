<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.8/axios.min.js"></script>
</head>

<body>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form method="POST" action="#" id="login-form">
                            @csrf

                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" class="form-control" id="email" name="email" required>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password" required>
                            </div>

                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="remember" name="remember">
                                <label class="form-check-label" for="remember">Remember Me</label>
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                        <div class="m-3"></div>
                        <button id="logged" class="btn btn-primary">Check Access Token</button>
                        <button id="refresh" class="btn btn-primary">Refresh Token</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script>
    window.onload = function() {
        console.log('Loading')

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            axios.post('/api/auth/login', {
                    email: email,
                    password: password,
                    remember: remember
                })
                .then(function(response) {
                    localStorage.setItem('access_token', response.data.access_token.split('|')[1]);
                    localStorage.setItem('refresh_token', response.data.refresh_token.split('|')[1]);

                    redirectToLogged(response.data.access_token.split('|')[1]);
                })
                .catch(function(error) {
                    alert('Login failed. Please try again.');
                });
        });

        const logged = document.getElementById('logged');
        const refresh = document.getElementById('refresh');

        logged.addEventListener('click', () => redirectToLogged(localStorage.getItem('access_token')));

        refresh.addEventListener('click', () => refreshAccessToken(localStorage.getItem('refresh_token')));

        function redirectToLogged(accessToken) {
            axios.get('/logged', {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Access denied. Please log in.', error);
                });
        }

        function refreshAccessToken(refreshToken) {
            axios.post('/api/auth/refresh', {
                    refresh_token: refreshToken
                })
                .then(function(response) {
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);

                    redirectToPosts(response.data.access_token);
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    }
</script>

</html>
