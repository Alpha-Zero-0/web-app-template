import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Web App
            <span className="relative whitespace-nowrap text-blue-600">
              <span className="relative"> Template</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            A full-stack web application template with Firebase authentication, MongoDB database, 
            and deployment configurations for Vercel and Render.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to get started
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              This template includes all the modern tools and best practices for building scalable web applications.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none bg-blue-600 rounded-full"></div>
                  Firebase Authentication
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Secure user authentication with email/password and Google OAuth integration.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none bg-blue-600 rounded-full"></div>
                  MongoDB Database
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Scalable NoSQL database with Mongoose ODM for data modeling and validation.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none bg-blue-600 rounded-full"></div>
                  Ready for Deployment
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Pre-configured for Vercel (frontend) and Render (backend) deployment.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="py-16 border-t border-gray-200">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built with Modern Technologies
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-4xl lg:grid-cols-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900">Frontend</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• React.js with Hooks</li>
                <li>• React Router for navigation</li>
                <li>• Tailwind CSS for styling</li>
                <li>• React Hook Form for forms</li>
                <li>• Firebase SDK for authentication</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900">Backend</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Node.js with Express</li>
                <li>• MongoDB with Mongoose</li>
                <li>• Firebase Admin SDK</li>
                <li>• JWT for additional auth</li>
                <li>• Comprehensive error handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
