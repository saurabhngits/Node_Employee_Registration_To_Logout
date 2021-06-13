> <br /> **Table of Contents** : 
>
> *[1. Pre-Requisites](#pre_requisites)* <br />
> *[2. Add Dotenv File](#add_env)* <br />
> *[3. Install Modules](#install_modules)* <br />
> *[4. Run Project](#run_project)* <br />
> *[5. Test Project](#test_project)* <br />
> <br />

<br />
<br />

# 1. Pre-Requisites <a id="pre_requisites"></a>

The following tools are need to be pre-install on your system
    
- [**Node JS**](https://nodejs.org/en/download/)
- [**MongoDB**](https://www.mongodb.com/try/download/community)

<br />
<br />

# 2. Add Dotenv File <a id="add_env"></a>

Add `.env` file to your root folder and then add required valiables as mention below into this file.

```
SECRET_KEY=<your_secret_key_to_generate_jwt_tokens_of_32_chars_in_length>
DB_CONN_STR=<your_mongodb_connection_string>
```

<br>

E.g.

```
SECRET_KEY=mynameissaurabhsunilkhairethecreator
DB_CONN_STR=mongodb://localhost:27017/employeeDB
```


<br />
<br />

# 3. Install required modules <a id="install_modules"></a>

Run the below command to install the required modules into this project.

    > npm i

<br />
<br />

# 4. Run project <a id="run_project"></a>

Run the below command to run this project

    > npm run start

<br />

OR

<br />

Run the below command to run this project with nodemon

    > npm run dev

<br />
<br />    


# 5. Test project <a id="test_project"></a>

Test this project at your browser with below address and port number: 

http://localhost:3000/ 
