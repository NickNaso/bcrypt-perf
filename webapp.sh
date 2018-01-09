
echo "Web application performance estimation\n"
#################################################################################
echo "==============================="
echo "Signup with bcrypt napi version"
autocannon -c 100 -m POST -H 'content-type=application/json' -b '{ "password": "Y5N=j>Naxr=MZ3*j"}' http://localhost:5000/signup-napi
echo "==============================="
echo "\n"
#################################################################################
echo "==============================="
echo "Signup with bcrypt nan version"
autocannon -c 100 -m POST -H 'content-type=application/json' -b '{ "password": "Y5N=j>Naxr=MZ3*j"}' http://localhost:5000/signup-nan
echo "==============================="
echo "\n"
#################################################################################
echo "==============================="
echo "Login with bcrypt napi version"
autocannon -c 100 -m POST -H 'content-type=application/json' -b '{ "password": "Y5N=j>Naxr=MZ3*j"}' http://localhost:5000/login-napi
echo "==============================="
echo "\n"
#################################################################################
echo "==============================="
echo "Login with bcrypt napi version"
autocannon -c 100 -m POST -H 'content-type=application/json' -b '{ "password": "Y5N=j>Naxr=MZ3*j"}' http://localhost:5000/login-nan
echo "==============================="