# ContentCloud - Content Management Made Easy

## Purpose

Contentcloud is a web application designed to empower content creators by streamlining digital content management, facilitating team collaboration, and ensuring seamless video streaming even in low-bandwidth environments. It offers the following key functionalities:

Effortless Content Management: Upload, organize, and track your digital content effortlessly through a user-friendly interface.
Collaborative Workspace: Foster effective communication and teamwork within your content creation team.
Optimized Video Streaming: Leverage AWS Elastic Transcoder and Amazon CloudFront to deliver high-quality videos even at low internet speeds.
## Key Features

Intuitive Upload: Upload various content types, including videos, images, and more.
Streamlined Organization: Organize your content using flexible categorization and tagging options.
Collaborative Tools: Facilitate communication and project management with team members using comments, annotations, and task assignments.
Elastic Transcoding: Utilize AWS Elastic Transcoder to transcode videos into various formats and resolutions, ensuring smooth playback across devices and bandwidth limitations.
S3 Storage: Store original and transcoded content securely in Amazon S3 buckets for scalability and durability.
CloudFront Integration: Deliver content efficiently with Amazon CloudFront, leveraging its global content delivery network for low latency and high availability.
Seamless Publishing: Schedule one-click content upload to various social media platforms or leverage Selenium bots for automated tasks.
## Technology Stack

Frontend: [ React,Vite, HTML, CSS, JavaScript]
Backend: [ Node.js, Express]
Database: [ MongoDB]
Cloud Services:
AWS S3: Secure object storage for original and transcoded videos.
AWS Elastic Transcoder: Video transcoding for optimized playback.
Amazon CloudFront: Content delivery network for efficient streaming.

## Installation

Clone the repository:

Bash
git clone https://github.com/[your-username]/[project-name].git
Use code with caution.
Install dependencies:

Bash
npm install  # or yarn install

Run the application:

Open the cloned folder and run cd ..frontend  and then vite to start the frontned
In another terminal run cd ./backend and then run nodemon index.js to start the backend
