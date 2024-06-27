const fakeDataFromStaffArray = (staffArray, storeId) => {
    return staffArray.map((staff) => {
        // Find the role object that matches the storeId
        const roleObj = staff.roles.find(role => role.storeId.toString() === storeId.toString());
        const role = roleObj ? roleObj.role : 'Staff'; // Default to 'Staff' if no role is found
        console.log(staff);
        console.log(staff._id.toString);

        return {
            id: staff._id, // Use the MongoDB _id as the unique ID
            name: staff.name,
            email: staff.email,
            role: role
        };
    });
};

const extractData = (staffArray, storeId) => {
    return staffArray.map((staff) => {
        return {
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            isBanauAdmin: staff.isBanauAdmin,
            role: staff.banauRoles.role
        };
    });
};

module.exports = {
    fakeDataFromStaffArray,
    extractData
};
