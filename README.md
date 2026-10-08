# FarmShare – Farm Equipment Sharing Portal

FarmShare is a platform that helps small farmers access agricultural equipment by renting or sharing machinery instead of purchasing expensive equipment.

## Problem

Many small farmers cannot afford expensive agricultural machinery such as tractors and harvesters.

## Solution

FarmShare connects farmers with equipment owners, allowing farmers to find available machinery and book it for a specific period.

## Database

The database manages:

* Users – farmers and equipment owners
* Equipment – tractors, harvesters, and other agricultural machinery
* Bookings – equipment rental and booking information

## Database Structure

```text
Users
  │
  ├── Equipment
  │     │
  │     └── Bookings
  │
  └── Bookings
```

### Tables

**users**

* User information
* Farmer/owner role

**equipment**

* Equipment details
* Owner information
* Location
* Rental price
* Availability status

**bookings**

* Farmer and equipment details
* Rental dates
* Total price
* Booking status

## SQL Concepts Used

* CREATE DATABASE
* CREATE TABLE
* INSERT
* SELECT
* WHERE
* UPDATE
* DELETE
* JOIN
* Primary Keys
* Foreign Keys

## Project Status

Database module completed using MySQL.

Frontend and backend integration will be added in the next stage.

## Future Scope

* User authentication
* Equipment search and filtering
* Online booking
* Equipment image storage
* Supabase integration
* Frontend and backend integration
* Booking and availability management
