# **AMMO News Hub**

## **Project Overview**

AMMO News Hub is a Single Page Application (SPA) developed using Django for the model-based web API and Vue/Vite for the reactive frontend. The application allows users to browse news articles, comment on articles, and manage their profiles, including selecting favorite news categories.

### **Key Features**

- User account creation, login, and logout using Django's authentication framework.
- Custom User model including fields for profile image, email, and date of birth.
- Profile page where users can edit their details and profile pictures via Ajax.
- News articles categorized into sections like Sports, World News, Finance, etc.
- Users can select their favorite news categories in their profile, filtering the articles shown to them.
- Commenting system on news articles, with options to reply, edit, and delete comments.
- Both frontend and backend support static type checking with TypeScript and Python type annotations, respectively.

### **Technologies Used**

- **Backend**: Django 4.2, Python 3.10
- **Frontend**: Vue 3, Vite, Pinia, TypeScript
- **Database**: SQLite (development), PostgreSQL (production)
- **Other Tools**: Git, npm, Conda

---

## **Deployment**

The application has been deployed to EECS's OpenShift platform. You can access it at the following URL:

[Group 50 AMMO News Hub Link](https://group50-web-apps-ec20333.apps.a.comp-teach.qmul.ac.uk/)

### **Admin Access**

- **Username**: admin
- **Password**: [admin]

### **Test Users**

1. **Username**: marco | **Password**: [testpass1]
2. **Username**: abbas | **Password**: [testpass1]
3. **Username**: oryna | **Password**: [testpass1]
4. **Username**: milena | **Password**: [testpass1]
5. **Username**: john | **Password**: [testpass1]

---

## **Local Development**

Follow these steps to run the project on your local machine:

1. **Set Up the Conda Environment**: **`conda create --name ammoenv python=3.10`**
2. **Activate the Environment**: **`conda activate ammoenv`**
3. **Install Python Dependencies**: **`pip install -r requirements.txt`**
4. **Create and Migrate Database**: **`python manage.py migrate`**
5. **Install JavaScript Dependencies**: Navigate to 'frontend' folder and run **`npm install`**
6. **Run the Vue Server**: In a separate terminal, navigate to 'frontend' and run **`npm run dev`**
7. **Run the Django Server**: **`python manage.py runserver`**
8. **Access the Application**: Open a browser and navigate to **`http://localhost:8000`**

## **Contributors**

- [Abbas Alibhai - ec20660](https://github.com/aJV99) - Responsible for creating the Profile Page and its and its subsequent functionality, including the uploading of images to the backend. Also assisted in deployment.
- [Marco Giovanni Solari - ec20333](https://github.com/Ms2302) - Responsible for creating Main Articles page and its subsequent functionality, and filtering news based on the user's favourite categories. Also assisted in deployment.
- [Milena Serych - ec211006]( https://github.com/milenaserych) - Responsible for database modelling and backend setup as well as setting up the Login and Registration pages and functionality. Also assisted in styling.
- [Oryna Goichuk - ec20251](https://github.com/orynamg) - Responsible for the detailed Article page and its subsequent functionality, as well as creating the Commenting and Replying functionality. Also assisted in styling.