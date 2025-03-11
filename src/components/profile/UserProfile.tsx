import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
}

export function UserProfile() {
  const { supabase, user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setFullName(data.full_name);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let avatarUrl = profile?.avatar_url;

      if (avatar) {
        const fileExt = avatar.name.split('.').pop();
        const filePath = `${user.id}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatar);

        if (uploadError) throw uploadError;

        avatarUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
        })
        .eq('id', user.id);

      if (error) throw error;

      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name}`}
            alt={profile.full_name}
            className="w-24 h-24 rounded-full object-cover"
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          )}
        </div>

        <div className="flex-1">
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">{profile.full_name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">@{profile.username}</p>
              <button
                onClick={() => setEditing(true)}
                className="text-teal-600 hover:text-teal-700"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}