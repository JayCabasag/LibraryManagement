# Library Management System

This is a web-based Library Management System developed using Next.js and Firebase. The system provides functionalities to manage books, members, and borrowing records in a library. It allows librarians to efficiently handle book inventory, track member information, and monitor book borrowing activities.

## Features

1. **Book Management**: The system enables librarians to add, edit, and delete books from the library's collection. Each book entry contains details such as title, author, ISBN, genre, and availability status.

2. **Member Management**: Librarians can maintain member records by adding, editing, and deleting member information. Each member entry includes details like name, contact information, and membership status.

3. **Borrowing Management**: The system tracks book borrowing activities, including issue and return dates. It allows librarians to process book loans, renewals, and returns. The system also provides reminders for overdue books and generates reports for book borrowing history.

4. **Search and Filtering**: Users can search for books based on various criteria, such as title, author, genre, or ISBN. The system offers filtering options to refine search results and facilitates quick book lookup.

5. **User Authentication**: The system implements user authentication using Firebase Authentication. Librarians and administrators can create accounts and log in securely to access the system's administrative features.

6. **Dashboard and Analytics**: The system includes a dashboard that provides an overview of key metrics, such as the total number of books, active members, and borrowed books. It also generates analytics reports to assist in decision-making and resource planning.

## Technologies Used

- **Next.js**: Next.js is a React framework for building server-side rendered and statically generated web applications. It provides an efficient and scalable solution for developing modern web applications.

- **Firebase**: Firebase is a comprehensive suite of cloud-based tools and services for building web and mobile applications. In this project, Firebase is utilized for user authentication, database management, and hosting.

- **React**: React is a JavaScript library for building user interfaces. Next.js is built on top of React, and together they provide a powerful development environment for creating interactive web applications.

- **CSS**: Cascading Style Sheets (CSS) is used to style and customize the appearance of the web application. Next.js allows the use of CSS-in-JS libraries like styled-components or CSS modules for styling components.

## Setup and Installation

To set up the Library Management System locally, follow these steps:

1. Clone the repository: `git clone https://github.com/JayCabasag/LibraryManagement.git`

2. Navigate to the project directory: `cd LibraryManagement`

3. Install the dependencies: `npm install`

4. Set up a Firebase project and enable Authentication and Realtime Database services.

5. Obtain your Firebase configuration details (API key, authDomain, databaseURL) and replace the placeholder values in the `.env.local` file with your own Firebase configuration.

6. Run the development server: `npm run dev`

7. Open your web browser and access the application at `http://localhost:3000`

## Deployment

To deploy the Library Management System to a production environment, you can follow these steps:

1. Build the optimized production version: `npm run build`

2. Deploy the application to Firebase hosting using the Firebase CLI or your preferred deployment method.

For detailed instructions on deploying a Next.js application to Firebase, refer to the official Next.js and Firebase documentation.

## Contributions

Contributions to the Library Management System are welcome! If you encounter any issues or have ideas for improvements, please submit an issue or pull request on the project's GitHub repository.

## License

The Library Management System is released under the [MIT License](LICENSE). Feel free to modify and use the codebase according to your requirements.

