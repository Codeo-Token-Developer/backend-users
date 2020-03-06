# USERS & ACCOUNT BACKEND DOCUMENTATION



##### <u>Create</u> New User

Required:

```
path: '/users/',
method: 'POST',
data/body: {
	name, email, password, confirm_password
}
```

Success output example:

```
{
  "message": "A verification email has been sent to 						test@gmail.com",
  "status": 200
}
```

Error output example: 

```
{
  "message": "Name cannot be empty, test@gmail.com already 					taken, please take another one",
  "status": 400
}
```



##### <u>Login</u>

Required: 

```
path: '/users/login/',
method: 'POST',
data/body: {
	email, password
}
```

Success output example:

```
{
  "message": "Welcome <user name>, hope you have a nice 				day",
  "token": <user token>,
  "user": {
    "avatar": <user avatar>,
    "id_country": <user id country>,
    "date": "2020-02-27T09:10:39.354Z",
    "verification": true,
    "_id": <user id>,
    "name": <user name>,
    "email": <user email>,
    "password":<user password>,
    "__v": 0,
    "account": <user account>,
    "kyc": <user kyc>
  },
  "status": 201
}
```

Error output example:

```
{
  "message": "Invalid email / password",
  "status": 500
}
```



##### <u>Verification User</u>

Success:

```
redirect to "http://dapp.codeotoken.com"
```



##### <u>Forgot Password</u>

Required:

```
path: '/users/forgotPassword',
method: 'POST',
data/body: {
	email
}
```

Success: 

```
{
	"message": "A verification email has been sent to <user email>"
}
```

Error:

```
{
	"message": "Email not found"
}
```

##### **<u>Recovery Password</u>**

Required: 

```
path: '/api/auth/password/:userId',
method: 'GET',
data/body: {
	newPassword
}

*note: You can get userId from params that send from server
```

Success:

```
{
	"message": "Password has been changed"
}
```



##### <u>Update **Password**</u>

Required: 

```
path: '/users/changePassword',
method: 'POST',
data/body: {
	oldPassword,
	newPassword
}
```

Success:

```
{
	"message": "A verification email has been sent to <user 				email>"
}
```

Error: 

```
{
	"message": "Email not found"
}
```



##### <u>Update User Data</u>

Required: 

```
path: '/',
method: 'PUT',
headers: {
	jwttoken
},
data/body: {
	name, email, avatar, id_country
}
```

Success output example: 

```
{
	"message": 'Your data has been updated',
	"status": 201
}
```



##### <u>Get 1 User</u>

Required: 

```
path: '/users/account',
method: 'GET',
headers: {
	jwttoken
}
```

Success example: 

```
{
  "avatar": <avatar>,
  "id_country": <user id country>,
  "date": "2020-02-27T09:10:39.354Z",
  "verification": true,
  "_id": <user id>,
  "name": <user name>,
  "email": <user email>,
  "password": <user password>,
  "__v": 0,
  "account": { <user account> },
  "kyc": <user kyc>
}
```

Error example:

```
{
	"message": "Account not found"
}
```



### **ACCOUNT**



##### <u>**Create Account**</u>

Required: 

```
path: '/accounts/newAccount',
method: 'POST',
headers: {
	jwttoken
}
```

Success example output:

```
{
  "_id": "5e534c0a7720bf1a48c018c1",
  "ETH": "0xD9aEBc08e7aee41ed73D9A1Ba93158E774089CFe",
  "key": {
    "version": 3,
    "id": "5e9e4a91-8535-4b04-8fb9-4cdf89b6385f",
    "address": "d9aebc08e7aee41ed73d9a1ba93158e774089cfe",
    "crypto": {
      "ciphertext": "09198daada4e6f9da71437153c337387eb93e27ab6a2ef199ed5f06e92917997",
      "cipherparams": {
        "iv": "56c87812506254178fd8e457cc6298b1"
      },
      "cipher": "aes-128-ctr",
      "kdf": "scrypt",
      "kdfparams": {
        "dklen": 32,
        "salt": "a1617efd2a6b39bf56c968887b066de98a9fb8616aff1343087b32ac49c251fd",
        "n": 8192,
        "r": 8,
        "p": 1
      },
      "mac": "3e30534849ecfa2563c927e95122a339d75063e3062b0a3fbf2408f442c1f3a7"
    }
  },
  "user": "5e533952988563168cbfb14b",
  "date": "2020-02-24T04:07:38.744Z",
  "__v": 0
}
```































