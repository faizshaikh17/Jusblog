# Jusblog: Ideas & Stories

## Project Overview

SimpleBlog is a minimalist blog platform designed for developers and writers who want a clean, distraction-free writing experience. It leverages Markdown for content creation and provides a simple, easy-to-use interface.  It's perfect for personal blogs, technical documentation, or sharing your thoughts with the world.![Jusblog.me](https://jusblog.vercel.app/)

Key features include:

*   Markdown support for easy content creation.
*   Simple, intuitive user interface.
*   Lightweight and fast performance.
*   Authentication & Authorization.

Main motive was to have person blogging platform though, I have not write something yet now we will see


## Features

*   **Great UI:**  Enjoy a modern and intuitive user interface designed for ease of use and a visually appealing experience.
*   **Authentication:**  Securely create an account and log in to manage your blog posts.
*   **Text Editor:** A rich text editor empowers you to create engaging and well-formatted blog posts with ease.
*   **Intuitive blog Library** Explore a diverse range of perspectives and content by browsing the blogs of other users on the platform.
*   **Responsive Design:**  Access and enjoy the blog app seamlessly on any device, from desktops to smartphones.

## Technologies Used 🛠️

*   **Frontend:**
    *   ReactJS
    *   Tailwind CSS
    *   JavaScript
    *   Redux Toolkit
    
*   **Backend:**
    *   Appwrite

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/faizshaikh17/Jusblog
    ```

2.  Navigate to the project directory:

    ```bash
    cd Jusblog  #Note I changed BlogApp for Jusblog
    ```

3.  Install the required Node modules:

    ```bash
    npm install
    ```

### Configuration

1.  Configure Appwrite:

    *   Rename `.env.sample` to `.env` in the project directory.
    *   Open `.env` and update the following variables with your Appwrite project and API keys:

        ```
        VITE_APPWRITE_PROJECT_ID=[YOUR_APPWRITE_PROJECT_ID]
        VITE_APPWRITE_ENDPOINT=[YOUR_APPWRITE_ENDPOINT] # Example:  https://cloud.appwrite.io/v1
        ```
    *   [Add any specific configuration steps related to your project]

### Running the Application

1.  Run the client server:

    ```bash
    npm run dev
    ```

2.  Open your preferred browser and navigate to:

    ```
    localhost:5173
    ```
