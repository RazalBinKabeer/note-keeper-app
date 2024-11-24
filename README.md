# EcoKeep - A Note Keeper Application

EcoKeep is a simple and modern note-keeping application inspired by Google Keep. It allows users to add, edit, pin, and delete notes with a clean and intuitive interface. The notes are stored securely in Firebase, making the app fully functional across multiple devices.

## Features

- **Add Notes**: Create a note with a title, tagline, and body text.
- **Pin Notes**: Pin notes to keep them always on top.
- **Edit Notes**: Modify existing notes with a simple click.
- **Delete Notes**: Remove notes from the UI and Firebase.
- **Pagination**: Display up to 6 notes per page for easier browsing.
- **Cloud Sync**: Notes are stored and retrieved from Firebase Cloud Firestore, ensuring they are accessible anywhere.

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Firebase (Firestore for database)
- **State Management**: React hooks (useState, useEffect)
- **Error Handling**: Toast notifications for user feedback

## Prerequisites

To run this project locally, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)

Additionally, you will need to set up a Firebase project and get your Firebase credentials.
