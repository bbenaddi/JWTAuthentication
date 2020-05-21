# JWTAuthentication
Hi! I built user Authentication using **JSON Web Token**.

## Installation:

> npm install

## Usage:
#### Database
database created using knex, therefore you should fill .env file.

  >  npm database

### SignUp
	send post request to localhost:3000/user/signup
	with json data as :
	{
		username : 'your_username',
		passwors : 'your_password'
	}
	
### Singin
	send post request to localhost:3000/user/signin
	with json data as :
	{
		username : 'your_username',
		passwors : 'your_password'
	}
	
	response if there is no error will be a token as :
	{
		token : '################################'
	}
### Verify Token
	send post request to localhost:3000/user/check
	with json data as :
	{
		token : '################################'
	}
	
	response if the token is valid will be :
	{
		id : '#'
	}
	
	check route has the middleware verify which sets the id 		
	extracted from token in req.body
## END
