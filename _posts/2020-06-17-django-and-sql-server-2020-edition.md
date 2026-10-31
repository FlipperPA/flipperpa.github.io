---
title: "Django and SQL Server: 2020 Edition"
layout: post
date: 2020-06-17 13:16:00
tags: ["Python", "Django", "How-To", "Linux", "Database"]
description: "Django offers support for SQL Server through the third-party database engine, django-mssql-backend. Here's an end-to-end set of instructions for the best practices for installing it in 2020."
---

Getting Django to use SQL Server as a database backend requires third party tools and drivers. However, much of the information available on the web on the topic is quite out of date. I've been a contributor to several drivers and packages over the years, supporting SQL Server as a Django database backend for The Wharton School. Here's how we do it; you can find Ansible roles and [a working CentOS 7 Vagrant box here](https://github.com/wharton/python-vagrant-centos7/) with all the prerequisites installed (hint: look in `provisioning/roles/mssql`). Instructions below are for RedHat/CentOS 7, but links will be provided for SUSE, OS/X and Ubuntu as well.

You may have seen my previous posts on this topic, recommending `django-pyodbc-azure`; it is no longer maintained. We now use `django-mssql-backend`. Be sure to uninstall all remnants or `django-pyodbc-azure`; in fact, starting with a fresh virtual environment might be the best bet.

## Step 1: Install the Microsoft Linux ODBC Driver

You can also use FreeTDS, but at the time of this writing, [I recommend using the Microsoft driver](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017) (includes instructions for alternate distributions).

```bash
sudo curl https://packages.microsoft.com/config/rhel/7/prod.repo > /etc/yum.repos.d/mssql-release.repo

sudo yum remove unixODBC-utf16 unixODBC-utf16-devel
sudo ACCEPT_EULA=Y yum install msodbcsql17
```

## Step 2: Verify the Installation

If everything worked, you should be able to verify the installation by viewing `/etc/odbcinst.ini`; it should have a section that looks something like this.

```bash
[ODBC Driver 17 for SQL Server]
Description=Microsoft ODBC Driver 17 for SQL Server
Driver=/opt/microsoft/msodbcsql17/lib64/libmsodbcsql-17.1.so.0.1
UsageCount=1
```

Take note of the section header of the file: `ODBC Driver 17 for SQL Server`. We will be using this later to reference the driver.

## Step 3: Setting Up a Service User in SQL Server

For best security practices, I recommend setting up an individual user for each Django project you have. The following script will create a `DATABASE`, `LOGIN`, `USER` and `PASSWORD` in SQL Server with the minimum permissions needed for Django to run.

```bash
/*
This Script Creates a SQL Server Database, Login and User
With Appropriate Permissions for a Production Django Project
with migrations. Simply fill out the variables below (@db_name and @db_password)
Username will be set to database name + '_user' by default.
*/
DECLARE @db_name VARCHAR(MAX) = 'project'
DECLARE @db_password VARCHAR(MAX) = 'project_password'
DECLARE @db_user VARCHAR(MAX) = @db_name + '_user'
--
--
USE master
DECLARE @cmd VARCHAR(MAX)
-- Server scope: create SQL Server login and permissions
SET @cmd = 'CREATE LOGIN ' + @db_user + ' WITH PASSWORD = ''' + @db_password + ''''
EXEC(@cmd)
SET @cmd = 'GRANT VIEW SERVER STATE TO ' + @db_user
EXEC(@cmd)
SET @cmd = 'CREATE DATABASE [' + @db_name + ']'
EXEC(@cmd)
-- DB scope: create user for server login and permissions
SET @cmd = 'USE [' + @db_name + '];'
SET @cmd = @cmd + 'CREATE USER ' + @db_user + ' FOR LOGIN ' + @db_user + ';'
SET @cmd = @cmd + 'GRANT SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE TABLE, REFERENCES, EXEC TO ' + @db_user
EXEC(@cmd)
```

## Step 4: Setting up Django

Fire up your virtual environment for your Django project. We're going to install django-mssql-backend (which will install pyodbc as well).

```bash
pip install django-mssql-backend
```

Then, we modify our Django settings.

```python
DATABASES = {
    'default': {
        'ENGINE': 'sql_server.pyodbc',
        'HOST': 'dbserver.your-domain.com',
        'PORT': '1433',
        'NAME': 'project',
        'USER': 'project_user',
        'PASSWORD': 'project_password',
        'OPTIONS': {
            'driver': 'ODBC Driver 17 for SQL Server',
            'unicode_results': True,
        },
    },
}
```

## Step 5: Run Initial Migrations

If everything has worked, you should now be able to run your initial migrations, and see Django's initial tables in your SQL Server database. If you have any questions, there are a bunch of us who watch the `django-mssql-backend` tag on Stack Overflow and willing to help!
