import EmailStatus from '../models/EmailStatus.js';

export const getEmailStatus = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(req.params)
    // If email is provided, find one email's status
    if (email) {
      const emailStatus = await EmailStatus.find({ email });
      if (emailStatus.length === 0) {
        return res.status(404).json({ message: 'No data found for this email.' });
      }
      return res.status(200).json(emailStatus);
    } 
    
    // If email is not provided, return all statuses
    const allStatuses = await EmailStatus.find();
    return res.status(200).json(allStatuses);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving email status', error });
  }
};
