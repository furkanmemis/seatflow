const {createPlane,getAllPlanes,getPlaneById,updatePlane,deletePlane} = require("../services/plane");

exports.createPlane = async (req, res) => {
    try {
        const plane = await createPlane(req.body);
        res.status(201).json(plane);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPlanes = async (req, res) => {
    try {
        const planes = await getAllPlanes();
        res.status(200).json(planes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPlaneById = async (req, res) => {
    try {
        const plane = await getPlaneById(req.params.id);
        if (!plane) {
            return res.status(404).json({ error: "Plane not found" });
        }
        res.status(200).json(plane);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePlane = async (req, res) => {
    try {
        const plane = await updatePlane(req.params.id, req.body);
        if (!plane) {
            return res.status(404).json({ error: "Plane not found" });
        }
        res.status(200).json(plane);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePlane = async (req, res) => {
    try {
        const plane = await deletePlane(req.params.id);
        if (!plane) {
            return res.status(404).json({ error: "Plane not found" });
        }
        res.status(200).json({ message: "Plane deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};