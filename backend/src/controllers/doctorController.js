const Doctor = require('../models/Doctor');

// Add a new doctor
exports.addDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();

        res.status(201).json({
            success: true,
            data: savedDoctor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get doctors list with filters and pagination
exports.getDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = {};

        if (req.query.specialization) {
            filter.specialization = req.query.specialization;
        }

        if (req.query.city) {
            filter['location.city'] = req.query.city;
        }

        if (req.query.gender) {
            filter.gender = req.query.gender;
        }

        if (req.query.minExperience) {
            filter.experience = { $gte: parseInt(req.query.minExperience) };
        }

        if (req.query.isOnline !== undefined) {
            filter.isOnline = req.query.isOnline === 'true';
        }

        // Execute query with pagination
        const doctors = await Doctor.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ rating: -1 });

        // Get total count for pagination
        const total = await Doctor.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                doctors,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalDocs: total,
                    limit
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 