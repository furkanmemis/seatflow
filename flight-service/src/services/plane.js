const Plane = require("../models/Plane");

exports.createPlane = async (planeData) => {
    const plane = new Plane(planeData);
    return await plane.save();
};

exports.getAllPlanes = async () => {
    return await Plane.find();
};

exports.getPlaneById = async (id) => {
    return await Plane.findById(id);
};

exports.updatePlane = async (id, planeData) => {
    return await Plane.findByIdAndUpdate(id, planeData, { returnDocument: "after" });
};

exports.deletePlane = async (id) => {
    return await Plane.findByIdAndDelete(id);
};
