import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import api from '../config/api';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [stats, setStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    // Fetch user statistics
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/stats');
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();

    // Set form default values
    if (user) {
      setValue('displayName', user.displayName || '');
      setValue('bio', user.profile?.bio || '');
      setValue('location', user.profile?.location || '');
      setValue('website', user.profile?.website || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile({
        displayName: data.displayName,
        profile: {
          bio: data.bio,
          location: data.location,
          website: data.website
        }
      });
      setIsEditing(false);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {user.photoURL ? (
                        <img
                          className="h-16 w-16 rounded-full"
                          src={user.photoURL}
                          alt="Profile"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xl font-medium text-gray-700">
                            {user.displayName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {user.displayName}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {user.provider} account
                      </p>
                    </div>
                  </div>
                  
                  {user.profile?.bio && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">{user.profile.bio}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    {user.profile?.location && (
                      <p className="text-sm text-gray-600">📍 {user.profile.location}</p>
                    )}
                    {user.profile?.website && (
                      <p className="text-sm text-gray-600">
                        🌐 <a href={user.profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                          {user.profile.website}
                        </a>
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Welcome Section */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to your Dashboard!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    This is your personal dashboard where you can manage your account and access all features.
                  </p>
                  
                  {stats && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Account Age</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.accountAge}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-green-900">Email Verified</p>
                        <p className="text-2xl font-bold text-green-600">
                          {stats.emailVerified ? '✓' : '✗'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Profile Form */}
              {isEditing && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Display Name
                        </label>
                        <input
                          {...register('displayName', {
                            required: 'Display name is required'
                          })}
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                        />
                        {errors.displayName && (
                          <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <textarea
                          {...register('bio')}
                          rows={3}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          {...register('location')}
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          placeholder="Your location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <input
                          {...register('website', {
                            pattern: {
                              value: /^https?:\/\/.+/,
                              message: 'Please enter a valid URL (starting with http:// or https://)'
                            }
                          })}
                          type="url"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                          placeholder="https://yourwebsite.com"
                        />
                        {errors.website && (
                          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                        )}
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Additional Features Section */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <h4 className="font-medium text-gray-900">Add New Feature</h4>
                      <p className="text-sm text-gray-500 mt-1">Customize this section for your app</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <h4 className="font-medium text-gray-900">Another Feature</h4>
                      <p className="text-sm text-gray-500 mt-1">Add your business logic here</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
