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

[AMMO News Hub](http://ammo-newshub.openshift.eecs.qmul.ac.uk/)

### **Admin Access**

- **Username**: admin
- **Password**: [admin]

### **Test Users**

1. **Username**: testuser1 | **Password**: [TestUser1Password]
2. **Username**: testuser2 | **Password**: [TestUser2Password]
3. **Username**: testuser3 | **Password**: [TestUser3Password]
4. **Username**: testuser4 | **Password**: [TestUser4Password]
5. **Username**: testuser5 | **Password**: [TestUser5Password]

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

- [Abbas Alibhai](https://github.com/aJV99)
- [Marco Giovanni Solari](https://github.com/Ms2302)
- [Milena Serych](https://github.com/milenaserych)
- [Oryna Goichuk](https://github.com/orynamg)
