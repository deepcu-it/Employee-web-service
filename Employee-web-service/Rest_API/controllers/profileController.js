import EmployeeSchema from '../models/EmployeeSchema.js';


// ✅ Get Profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await EmployeeSchema.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await EmployeeSchema.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    await EmployeeSchema.findByIdAndDelete(req.user.id);
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

