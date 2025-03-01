# NexBid - Online Auction Marketplace

A Modern auction platform where users can bid, sell, and browse items.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Known Issues](#known-issues)
- [Contact](#contact)

## Overview

NexBid is a React-based auction marketplace that allows users to create listings, place bids, and manage their profiles. It features an intuitive UI, real-time bidding updates, and a seamless user experience for both buyers and sellers.

### Live Demo

🎉 [NexBid on Netlify](https://sp2-ihlonne.netlify.app/)

## Features

✅ User Authentication - Sign up, log in, and manage your profile<br>
✅ Bidding System - Place bids on auctions in real-time<br>
✅ Auction Listings - View and filter auctions based on categories<br>
✅ Favorites System - Save auctions for later<br>
✅ Mobile Responsive Design - Optimized for all devices<br>
✅ Secure API Requests - Uses authentication tokens for protected routes<br>

## Tech Stack

| Technology       | Description                                           |
| ---------------- | ----------------------------------------------------- |
| **React**        | Frontend framework for building UI components         |
| **Vite**         | Fast build tool and development server for React      |
| **Chakra UI**    | UI library for accessible and customizable components |
| **Axios**        | HTTP client for API requests                          |
| **React Router** | Client-side routing for navigation                    |
| **Date-fns**     | Library for date manipulation and formatting          |
| **Netlify**      | Deployment platform for hosting the application       |
| **Node.js**      | JavaScript runtime for development                    |

## Setup & Installation

To run NexBid locally, follow these steps:

### 1. Clone the repository

```
git clone https://github.com/ihlonne/SP2-ihlonne.git
cd nexbid
```

### 2. Install dependencies

```
npm install
```

### 3. Set Up Environment Variables

create a `.env` file in the root directory and add:

```
VITE_API_KEY=your-api-kei
```

### 4. Run the Development Server

```
npm run dev
```

Visit `http:/localhost:5173/` in your browser.

## Environment Variables

| Variable         | Description              |
| ---------------- | ------------------------ |
| **VITE_API_KEY** | API authentication token |

## Usage

#### Sign Up & Login

- Users can create an account and log in.<br>
- Upon registration, users receive 1,000 credits.

#### Profile

- Users can change their own avatar, profile banner and bio description.

#### Browse Auctions

- View auctions from different categories.<br>
- Use the search bar to find specific items.<br>
- Sort listings by all auctions, ending soon, latest added and highest bid

#### Place a Bid

- Click on an auction to view details.<br>
- Enter your bid amount and submit (requires authentication).<br>
- View bidding history

#### Create an Auction

- Authenticated users can create their own listings.<br>
- Upload images, set a starting bid, and choose an end time.<br>
- May change the details of a published listing.<br>
- May delete a published listing.

#### Favorite Auctions

- Click the heart ❤️ icon to save an auction.<br>
- View all saved auctions under the Favorites section.<br>
- Click the heart ❤️ icon again to remove an auction from favorites.

## Known issues

What is listed below are things I'm aware of, but will have to consider at a later point.

⚠️ Too many API requests (429 error)<br>
📌 Solution: Add debouncing or cache data to avoid excessive API calls.

⚠️ Favorites don't persist on different browsers/devices<br>
📌 Solution: The API doesn't support favorites so I have used localStorage. I'm not sure if I can do anything about this, but I may look into it at a later point.

⚠️ Messy code<br>
📌 Solution: Break the code into smaller and modular blocks of code.

## Contact

For questions or feedback, feel free to contact:

- 👩🏽 **Ingelinn Helene Lønne**
- 📨 ingelinn92@gmail.com
- 🔗 LinkedIn: [ingelinnhelenelonne](https://www.linkedin.com/in/ingelinnhelenelonne/)
