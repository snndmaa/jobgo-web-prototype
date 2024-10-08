// profileUtils.ts

export const getProfileFromLocalStorage = (userId: string) => {
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    return profiles.find((profile: any) => profile.id === userId);
  };
  
  export const updateProfileInLocalStorage = (updatedProfile: any) => {
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    const profileIndex = profiles.findIndex((profile: any) => profile.id === updatedProfile.id);
  
    if (profileIndex > -1) {
      profiles[profileIndex] = updatedProfile;
    } else {
      profiles.push(updatedProfile);
    }
  
    localStorage.setItem('profiles', JSON.stringify(profiles));
  };
  