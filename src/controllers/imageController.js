const cloudinary = require('../middlewares/cloudinary')

exports.getImages = async (req, res) => {
  try { 
    const result = await cloudinary.api.resources(); 
    const images = result.resources.map(image => ({
      public_id: image.public_id,
      url: image.url
    }));

    res.status(200).json({ 
        data:images
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
};