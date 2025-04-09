
---

# FileHub

**FileHub** is a backend project designed to handle file uploads efficiently, integrating MongoDB for database storage and Cloudinary for cloud-based media management. This project provides a robust solution for uploading, managing, and processing files, including images and videos, with additional features like file type conversion, size optimization, and email notifications.

## Features

1. **Local File Upload**
   - Uploads files to a specified directory on your local machine.
   - Stores metadata about the uploaded file in MongoDB.

2. **Image Upload**
   - Uploads images to Cloudinary and creates an entry in MongoDB.
   - Automatically detects the file type, converts it to the required format (if needed), and uploads it to Cloudinary.
   - Reduces the image size before uploading to optimize storage and performance.

3. **Video Upload**
   - Uploads videos to Cloudinary with an upper size limit (e.g., 5 MB).
   - Creates an entry in MongoDB with video metadata.
   - Ensures efficient handling of video files within the specified constraints.

4. **Email Notification**
   - Sends an email notification to the user upon successful file upload.
   - Utilizes Nodemailer and POST middleware to trigger and manage email delivery.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **MongoDB**: Database for storing file metadata.
- **Cloudinary**: Cloud-based media management platform for storing and serving images and videos.
- **Nodemailer**: Email sending library for Node.js.
- **Express**: Web framework for handling routes and middleware.

## About Cloudinary

Cloudinary is a powerful cloud-based media management platform that simplifies the process of uploading, storing, transforming, and delivering images, videos, and other files. It provides a robust API and SDKs for seamless integration with applications. Key features of Cloudinary include:

- **Media Storage**: Securely stores files in the cloud with scalable infrastructure.
- **Transformations**: Allows on-the-fly manipulation of images and videos (e.g., resizing, cropping, format conversion).
- **Optimization**: Automatically optimizes files for faster delivery and reduced bandwidth usage.
- **CDN Delivery**: Serves media through a global content delivery network for low-latency access.

In **FileHub**, Cloudinary is used to store and manage uploaded images and videos, ensuring efficient processing and reliable access.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chaitanya980/filehub.git
   ```
2. Navigate to the project directory:
   ```bash
   cd filehub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (create a `.env` file):
   ```plaintext
   MONGODB_URl=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   PORT=your_port_number
   MAIL_USER=your_email_address
   MAIL_PASS=your_email_password
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

1. **Local File Upload**
   - Send a POST request to `/localFileUpload` with the file in the request body.
2. **Image Upload**
   - Send a POST request to `/imageUpload` with the image file. The system will process, convert, and upload it to Cloudinary.
3. **Video Upload**
   - Send a POST request to `/videoUpload` with the video file (max 5 MB). The file is uploaded to Cloudinary and logged in MongoDB.
4. **Email Notification**
   - Automatically triggered after any successful upload. Ensure Nodemailer is configured with valid credentials.

## API Endpoints

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/localFileUpload`    | Uploads a file to local storage      |
| POST   | `/imageUpload`    | Uploads and processes an image       |
| POST   | `/videoUpload`    | Uploads a video (max 5 MB)           |

## Future Enhancements

- Add support for more file types (e.g., PDFs, documents).
- Implement file download functionality.
- Add user authentication for secure uploads.


---

